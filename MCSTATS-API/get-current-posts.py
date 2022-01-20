#!/usr/bin/env python3
from ast import IsNot
from urllib.parse import quote_plus
from praw.models import MoreComments

import praw
import basc_py4chan
import time
from datetime import datetime
import json
from bs4 import BeautifulSoup
import mysql.connector
import requests

MY_USER = "monsteradvocate"
TERM_LIST = ["pokemon clone", "pokeclone", "poke-clone", "coromon", "monster crown", "dwm", "dragon warrior monsters", "dragon quest monsters", "dqm", "kindred fates", "monster sanctuary", "monster taming", "monster catching", "siralim", "temtem", "monster rancher"]
BOARD_LIST = ["v","vp"]
SUBRE_LIST = ["gaming","games","truegaming","monstertamerworld","nintendo","pokemon"]

HTML_HEAD = "<!DOCTYPE html><html lang=\"en\"><head>  <title>Control Center</title>  <meta charset=\"utf-8\">  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css\">  <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js\"></script>  <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js\"></script></head><body style=\"background-color:lightgray;\">"

class Project:
    id=-1
    game_id=-1

class ProjectList:
    projectList = []

class TermList:
    terms = []

def main():    
    #declarations
    now = time.time()
    usedThreads = [""]

    #initialize sql db connection
    conn = mysql.connector.connect(host='localhost',
                                    database='mcstats',
                                    user='devotedtoneurosis',
                                    password='6:AkMhR6(5>pj,#a')
    
    #initalize reddit connection
    reddit = praw.Reddit(
        user_agent="monsteradvocate (by u/monsteradvocate)",
        client_id="j_VZbYhCZG33dQ",
        client_secret="XD7OIVmwkw7eONyOOULfOMN0jszWkQ",
        username="monsteradvocate",
        password="Digitalking1!",
    )

    #grab projects and terms
    projects = grab_projects(conn)

    #work through projects
    for project in projects.projectList:
        print("Working on project:"+str(project.id))

        #log hourly app stats     
        print("---Checking steam stats for "+str(project.game_id))
        response_API = requests.get('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid='+str(project.game_id))
        data = response_API.text
        parse_json = json.loads(data)
        parseDict = parse_json['response']
        player_count = parseDict['player_count']
        print("------players:"+str(player_count))
        insert_playercount(conn,project.id,player_count)
        print("------steam stats logged.")

        #grab terms
        termList = grab_terms(conn,project.id)
        print("---Grabbed terms")

        #scrape reddit
        print("---Starting Reddit scan")
        for subreddit in SUBRE_LIST:
            subreddit = reddit.subreddit(subreddit)
            for submission in subreddit.hot(limit=25):
                if submission is not None and submission.title is not None:
                    process_submission(conn,submission,usedThreads,termList.terms,project.id)
            print("------completed subreddit")
        print("---reddit threads logged.")

        #scrape 4chan
        print("---Starting 4chan scan")
        for board in BOARD_LIST:
            grab_four_chan(conn,board,usedThreads,termList,project.id)
        print("---4chan threads logged.")


        print("project: "+str(project.id)+" complete!")
    
    print("All Projects Done.")

def grab_four_chan(conn,board,usedThre,termList,projid):
    board = basc_py4chan.Board(board)
    threads = board.get_all_threads()
    for thread in threads:
        posts = thread.all_posts
        for post in posts:
            for term in termList.terms:
                if term.upper() in post.html_comment.upper() and thread.url not in usedThre:
                    print("------4chan entry found")
                    insert_record(conn,thread.url,datetime.now(),BeautifulSoup(post.html_comment,features="html.parser").get_text(),BeautifulSoup(post.html_comment,features="html.parser").get_text(),len(posts),projid)

def process_submission(conn,submission,usedThre,termList,projid):
    count = 0
    for comment in submission.comments:
        if not isinstance(comment, MoreComments):
            for term in termList:
                if term.upper() in comment.body.upper() and submission.title.encode('ascii','ignore') not in usedThre:
                    print("------Match found!")
                    usedThre.append(submission.title.encode('ascii','ignore'))
                    insert_record(conn,submission.url, datetime.utcfromtimestamp(submission.created_utc), submission.title.encode('ascii','ignore'), comment.body.encode('ascii','ignore'), submission.score,projid)

def grab_projects(conn):
    cursor = conn.cursor()
    cursor.execute("select * from projects")
    projectReadList = cursor.fetchall()

    projectList = ProjectList()
    for project in projectReadList:
        projectObj = Project()
        projectObj.id = project[0]
        projectObj.game_id = project[2]
        projectList.projectList.append(projectObj)

    conn.commit()
    cursor.close()

    return projectList

def grab_terms(conn,projid):
    cursor = conn.cursor()
    cursor.execute("select * from social_criterias where project_id = " + str(projid))
    termReadList = cursor.fetchall()

    termList = TermList()
    for term in termReadList:
        termList.terms.append(term[2])

    conn.commit()
    cursor.close()

    return termList
    
def insert_record(conn,url,date,title,preview,weight,projid): 
    print("------inserting record:"+url)
    cursor = conn.cursor()
    
    #only if weight is greater
    cursor.execute("select * from pages where project_id like %s and url like '%s'",projid,"'"+url[:1024]+"'")
    rows = cursor.fetchall()
    print("ROWS:"+str(len(rows)))
    if len(rows) < 1:       
        now = datetime.now()
        sqlCm = "INSERT INTO pages (url,date,title,preview,weight,createdAt,updatedAt,project_id) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)"
        sqlVal = (url[:1024], date, title[:1024], preview[:5000], weight,now, now,projid)
        cursor.execute(sqlCm, sqlVal)
        conn.commit()
        print("------Record inserted")
    else:
        sqlCm = "UPDATE pages SET weight = %s WHERE url = %s and project_id = %s"
        sqlVal = (weight,"'"+url[:1024]+"'",projid)
        cursor.execute(sqlCm, sqlVal)
        conn.commit()
        print("------Record updated")

    conn.commit()
    cursor.close()


def insert_playercount(conn,project_id,playercount):
    cursor = conn.cursor()
    
    #only if weight is greater
    now = datetime.now()
    sqlCm = "INSERT INTO stats (project_id, timestamp, player_count,createdAt,updatedAt) VALUES (%s,%s, %s, %s, %s)"
    sqlVal = (project_id,now, playercount,now,now)
    cursor.execute(sqlCm, sqlVal)
    conn.commit()
    cursor.close()
    print("------Record inserted")

if __name__ == "__main__":
    main()