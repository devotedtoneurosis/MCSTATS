#!/usr/bin/env python3
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

        #scrape reddit
        for subreddit in SUBRE_LIST:
            subreddit = reddit.subreddit(subreddit)
            for submission in subreddit.stream.submissions():
                process_submission(submission,usedThreads,termList)
        print("---reddit threads logged.")

        #scrape 4chan
        for board in BOARD_LIST:
            grab_four_chan(board,usedThreads,termList)
        print("---4chan threads logged.")


        print("project: "+project.id+" complete.")
    
    print("All Projects Done.")

def grab_four_chan(board,usedThre,termList):
    compTxt=""
    board = basc_py4chan.Board(board)
    threads = board.get_all_threads()
    for thread in threads:
        posts = thread.all_posts
        for post in posts:
            for term in termList:
                if term.upper() in post.html_comment.upper() and thread.url not in usedThre:
                    print("----4chan entry found")
                    insert_record(thread.url,datetime.now(),BeautifulSoup(post.html_comment,features="html.parser").get_text(),thread.replies)
    return compTxt

def process_submission(submission,usedThre,termList):
    count = 0
    compTxt=""
    for comment in submission.comments:
        if not isinstance(comment, MoreComments):
            for term in termList:
                if term.upper() in comment.body.upper() and submission.title not in usedThre:
                    usedThre.append(submission.title)
                    insert_record(submission.url, datetime.utcfromtimestamp(submission.created_utc), submission.title, comment.body, submission.score)
    return compTxt

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
        termList.terms.append(term[1])

    conn.commit()
    cursor.close()

    return termList
    
def insert_record(conn,url,date,title,preview,weight):    
    cursor = conn.cursor()
    
    #only if weight is greater
    cursor.execute("select * from pages where url like ? and weight > ?",url,weight)
    if cursor.rowcount < 1:
        now = datetime.now()
        sqlCm = "INSERT INTO pages (url,date,title,preview,weight,createdAt,updatedAt) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        sqlVal = (url, date, title, preview, weight,now, now)
        cursor.execute(sqlCm, sqlVal)
        conn.commit()
        print("----Record inserted")

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
    print("----Record inserted")

if __name__ == "__main__":
    main()