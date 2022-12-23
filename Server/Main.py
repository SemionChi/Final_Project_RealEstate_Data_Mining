import os
from fastapi import FastAPI
from pydantic import BaseModel
import datetime
import pandas as pd
import numpy as np
from selenium import webdriver
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import NearestNeighbors, KNeighborsClassifier, KNeighborsRegressor
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.tree import DecisionTreeClassifier
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import PolynomialFeatures

class Item(BaseModel):
    property_type: int
    rooms: int
    floor: int
    square_foot: int
    day: int
    month: int
    year: int
    lat: float
    lng: float
    model: int



def machine_learning(item: Item):
    data_frame = pd.read_csv("../fast_api_csv.csv")
    ## Trying to build liniar regreation
    x = data_frame.drop(['price'], axis=1).values
    y = data_frame['price'].values
    # spliting the data set into trainging set and test set
    # using sklearn
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=0)
    ml = LinearRegression()
    ml.fit(x_train, y_train)
    list_n = ([item.property_type,item.rooms,item.floor,item.square_foot,item.day,item.month,item.year,item.lat,item.lng])
    n_arry = np.array(list_n)
    n_arry = n_arry.reshape(1,-1)
    value_of_appartment = ml.predict(n_arry)
    return value_of_appartment[0].item()


def poln_machine_learning(item: Item):
    data_frame = pd.read_csv("../fast_api_csv.csv")
    ## Trying to build liniar regreation
    x = data_frame.drop(['price'], axis=1).values
    y = data_frame['price'].values
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=0)
    list_n = ([item.property_type, item.rooms, item.floor, item.square_foot, item.day, item.month, item.year, item.lat, item.lng])
    n_arry = np.array(list_n)
    n_arry = n_arry.reshape(1, -1)
    # applying polynomial regression degree 2
    poly = PolynomialFeatures(degree=3, include_bias=True)
    x_train_trans = poly.fit_transform(x_train)
    x_test_trans = poly.transform(n_arry)
    # include bias parameter
    lr = LinearRegression()
    lr.fit(x_train_trans, y_train)
    y_pred = lr.predict(x_test_trans)
    return y_pred[0].item()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/predict')
async def create_item(item: Item):
    return machine_learning(item) if item.model == 1 else poln_machine_learning(item)
