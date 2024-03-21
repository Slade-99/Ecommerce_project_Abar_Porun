
import sys
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler




def predict_instance(inputs):
    single_instance = pd.DataFrame(inputs)
    prediction = model2.predict(single_instance)
    return prediction[0]

# Read inputs from Node.js and make predictions



dataset_path = "./ML_Predict/dataset.csv"  # the path with username
dataset1 = pd.read_csv(dataset_path)    #accessing the dataset
dataset1.Decision.unique()



dataset1['Decision'] = dataset1['Decision'].map({'Yes':1,'No':0})
dataset1['Price'] = dataset1['Price'].map({'High':1,'Medium':0.5,'Low':0})
dataset1['Fabric'] = dataset1['Fabric'].map({'Cotton':1,'Lawn':0.5,'Silk':0})
dataset1['Colour'] = dataset1['Colour'].map({'Bright':1,'Dull':0})
dataset1['Design'] = dataset1['Design'].map({'Solid':1,'Print':0})
dataset1['Gender'] = dataset1['Gender'].map({'Male':1,'Female':0})
x = dataset1.drop(['Decision'],axis=1)                                                                               #Creating the input 'x' without Decision column
y = dataset1['Decision']                                                                                                      # Storing the output(diagnosis) as y
x_train, x_test, y_train, y_test = train_test_split(x,y,test_size=0.3,random_state=40)   # Taking 30% of the data(171 samples) for testing and 70% for training
                                                                                       # but keeping the correlation constant.

"""**Model_2: Decision Tree**


"""

from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix, classification_report



# Assuming x_train, y_train, x_test, y_test are defined elsewhere

dtc = DecisionTreeClassifier()
model2 = dtc.fit(x_train, y_train)





# Assuming you have your trained model as 'model2' and your dataset features stored in a DataFrame 'dataset1'
inputs = (sys.stdin.read().strip())
input_json = json.loads(inputs)
prediction = predict_instance(input_json)

# Predict the output for the single instance

prediction = int(prediction)
# Print the predicted output
# Send output back to Node.js
print(prediction)
