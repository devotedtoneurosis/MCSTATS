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

MY_USER = "monsteradvocate"
TERM_LIST = ["pokemon clone", "pokeclone", "poke-clone", "coromon", "monster crown", "dwm", "dragon warrior monsters", "dragon quest monsters", "dqm", "kindred fates", "monster sanctuary", "monster taming", "monster catching", "siralim", "temtem", "monster rancher"]
BOARD_LIST = ["v","vp"]
SUBRE_LIST = ["gaming","games","truegaming","monstertamerworld","nintendo","pokemon"]

HTML_HEAD = "<!DOCTYPE html><html lang=\"en\"><head>  <title>Control Center</title>  <meta charset=\"utf-8\">  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css\">  <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js\"></script>  <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js\"></script></head><body style=\"background-color:lightgray;\">"

def main():    
    reddit = praw.Reddit(
        user_agent="monsteradvocate (by u/monsteradvocate)",
        client_id="j_VZbYhCZG33dQ",
        client_secret="XD7OIVmwkw7eONyOOULfOMN0jszWkQ",
        username="monsteradvocate",
        password="Digitalking1!",
    )
    
    txtOut=HTML_HEAD
    now = time.time()
    count = 0
    usedThreads = [""]

    txtOut+="<div class=\"container\" style=\"width:80%;\">"

    for subreddit in SUBRE_LIST:
        txtOut+="<div class=\"row\">"
        subreddit = reddit.subreddit(subreddit)
        for submission in subreddit.stream.submissions():
            txtOut += process_submission(submission,usedThreads)
            count+=1
            if count > 99:   
                txtOut+="</div>"
                count = 0      
                print("Subreddit complete")
                break
    
    for board in BOARD_LIST:
        txtOut+="<div class=\"row\">"  
        txtOut+=grab_four_chan(board,usedThreads)
        txtOut+="</div>"
            
    txtOut+="</div>"
        
    text_file = open("Output.htm", "w")
    text_file.write(txtOut)
    text_file.close()
    
    print("Done")

def grab_four_chan(board,usedThre):
    compTxt=""
    board = basc_py4chan.Board(board)
    threads = board.get_all_threads()
    for thread in threads:
        posts = thread.all_posts
        for post in posts:
            for term in TERM_LIST:
                if term.upper() in post.html_comment.upper() and thread.url not in usedThre:
                    print("4chan entry found")
                    insert_record(thread.url,datetime.now(),BeautifulSoup(post.html_comment,features="html.parser").get_text(),post.replies)
    return compTxt

def process_submission(submission,usedThre):
    count = 0
    compTxt=""
    for comment in submission.comments:
        if not isinstance(comment, MoreComments):
            for term in TERM_LIST:
                if term.upper() in comment.body.upper() and submission.title not in usedThre:
                    usedThre.append(submission.title)
                    insert_record(submission.url, datetime.utcfromtimestamp(submission.created_utc), submission.title, comment.body, submission.score)
    return compTxt
    
def insert_record(url,date,title,preview,weight):
    conn = mysql.connector.connect(host='localhost',
                                    database='mcstats',
                                    user='devotedtoneurosis',
                                    password='6:AkMhR6(5>pj,#a')
    cursor = conn.cursor()
    
    #only if weight is greater
    cursor.execute("select * from pages where url like ? and weight > ?",url,weight)
    if cursor.rowcount < 1:
        sqlCm = "INSERT INTO pages (url,date,title,preview,weight,createdAt,updatedAt) VALUES (%s, %s, %s, %s, %s, datetime.now(), datetime.now())"
        sqlVal = (url, date, title, preview, weight)
        cursor.execute(sqlCm, sqlVal)
        conn.commit()
        print("Record inserted")

if __name__ == "__main__":
    main()