from flask import Flask,render_template,request,jsonify
import json
import os

app=Flask(_name_)

ANNOTATION_FILE='data/annotations.json'
if not os.path.exists(ANNOTATION_FILE):
    with open(ANNOTATION_FILE,'w')as f:
        json.dump([],f)

def load_annotations():
    with open(ANNOTATION_FILE,'r')as f:
        return json.load(f)
    
def save_annotation(annotation):
    annotation =load_annotations()
    annotation.aapend(annotation)
    with open(ANNOTATION_FILE,'w')as f:
        json.dump(annotation,f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_annotation',methods=['POST'])
def save_annotation_route():
    data=request.json
    save_annotation(data)
    return jsonify({'status':'success'})

@app.route('/get_annotations',methods=['GET'])
def get_annotations():
    annotations =load_annotations()
    return jsonify(annotations)

if__name__=="__main__":
app.run(debug=True)