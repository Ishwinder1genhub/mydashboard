from flask import Flask, jsonify, render_template,json,request
import pandas as pd
from pymongo import MongoClient
import urllib.parse
from pandas import DataFrame
from bson.objectid import ObjectId
import datetime
app = Flask(__name__)

# Database
client = MongoClient('mongodb://admin:Genesis#2o2!@44.242.163.154:27017/')
db=client.admin

# two decorators, same function
@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/symbol.html')
def symbol():
    return render_template('symbol.html')

@app.route('/myth.html')
def myth():
    return render_template('myth.html')
@app.route('/base.html')
def myth1():
    return render_template('base.html')

@app.route('/cards.html')
def myth2():
    return render_template('cards.html')

@app.route('/chart4.html')
def myth4():
    return render_template('chart4.html')
@app.route('/chart5.html')
def myth5():
    return render_template('chart5.html')
@app.route('/chart6.html')
def myth6():
    return render_template('chart6.html')
@app.route('/chart7.html')
def myth7():
    return render_template('chart7.html')

@app.route("/getdata",methods=["GET"])
def getdata():
    jsond= request.json()
    collection = db.cap_master.aggregate([
        {"$match":{"_id":ObjectId(jsond["_id"])}},
            {"$project":{"_id":1}}
            ])
    df= pd.DataFrame(list(collection)).fillna(0)
    data= df.to_dict("records") 
    return json.dumps(data)

@app.route("/postdata",methods=["POST"])
def postdata():
    jsond= request.json()
    insert = db.cap_master.update_one({"_id":ObjectId(jsond["_id"])},{"$set":{"data":jsond["data"]}})
    return jsonify({"message":"updated"})

if __name__ == '__main__':
    app.run(debug=True)
