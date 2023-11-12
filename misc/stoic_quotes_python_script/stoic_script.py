import json
import requests
import time

with open('database/more_quotes.json') as file:
    data = json.load(file) 

def create_quote(author:str, quote:str):
    url = 'http://localhost:3000/quotes/'

    obj = {
        "author": author, 
        "quote": quote
        }

    try:
        post_request = requests.post(url, json=obj)

        if post_request.status_code == 201:
            print('Quote created successfully.')
            
    except Exception as e:
        print(e)
        print(post_request.status_code)

def bulk_create_quotes(data):

    url = 'http://localhost:3000/quotes/'

    try:
        # for item in data.values():
        for item in data:

            obj = {
                "author": item['author'], 
                "quote": item['quote'] }

            post_request = requests.post(url, json=obj)

            time.sleep(1)

            print(f'Quote created with status code {post_request.status_code}')

    except Exception as e:
        print(e)
        print(post_request.status_code)

def delete_quote(id):
    url = f'http://localhost:3000/quotes/delete/{id}'
    try:
        post_request = requests.delete(url)

        if post_request.status_code == 200:
            print(f"ID {id} was deleted successfully.")

        if post_request.status_code == 404:
            print(f"ID {id} not found.")

    except Exception as e:
        print(e)
        print(post_request.status_code)






if __name__ == '__main__':

    # bulk_create_quotes(data)

    # delete_quote('6550d0dfed88998bdd2cde20')

    create_quote(
        author="eu",
        quote="test quote 2"
    )


