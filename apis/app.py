import json
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)


@app.route('/users', methods=['GET'])
def getUsers():
    data = '[{"name": "Sebastian Eschweiler","email": "sebastian@codingthesmartway.com", "password": "12345678"},{"name": "Steve Palmer","email": "steve@codingthesmartway.com","password": "12345678"}]'
    response = app.response_class(response=data,
                                  status=200,
                                  mimetype='application/json')
    return response


@app.route('/locations', methods=['GET'])
def getLocations():
    data = ['Jaipur', 'Noida', 'Mumbai', 'Kolkata', 'Delhi']
    response = app.response_class(response=json.dumps(
        data, default=lambda o: o.__dict__),
                                  status=200,
                                  mimetype='application/json')
    return response


@app.route('/skills', methods=['GET'])
def getSkills():
    data = [
        "SAP.BOBJ", "SAP.ABAP", "JDE", "Java.core", "Custom Application",
        "COBOL", "Application Maintenance & Support",
        "Java.Spring & Hibernate", "c#.NET", "Test Automation",
        "Oracle Database", "Custom Development", "Oracle Application",
        "SAP.SCM.SD", "SAP.BASIS", "Technincal Requirement", "SAP.FIN.FI"
    ]
    response = app.response_class(response=json.dumps(
        data, default=lambda o: o.__dict__),
                                  status=200,
                                  mimetype='application/json')
    return response


@app.route('/optimized-solution', methods=['GET', 'POST'])
@cross_origin()
def home():
    if (request.method == 'POST'):
        print(request.get_json())
        data = create_dummy_output()
        response = app.response_class(response=json.dumps(
            data, default=lambda o: o.__dict__),
                                      status=200,
                                      mimetype='application/json')
    return response


@app.route('/input', methods=['GET'])
def disp():
    data = create_dummy_input()
    response = app.response_class(response=json.dumps(
        data, default=lambda o: o.__dict__),
                                  status=200,
                                  mimetype='application/json')
    return response


#Input Models
class employee_requirement:
    def __init__(self, skill_name, head_count, training_cost):
        self.skill_name = skill_name
        self.head_count = head_count
        self.training_cost = training_cost


class project_requirement:
    def __init__(self, employee_requirement, relocation_cost, loc, start_date):
        self.employees = employee_requirement
        self.relocation_cost = relocation_cost
        self.location = loc
        self.start_date = start_date


#Output Models
class preference_list:
    def __init__(self, employee_solution1, employee_solution2,
                 employee_solution3):
        self.employee_solution1 = employee_solution1
        self.employee_solution2 = employee_solution2
        self.employee_solution3 = employee_solution3


class employee:
    def __init__(self, id, name, skill, city, relocation_cost, training_cost,
                 total_cost, need):
        self.id = id
        self.name = name
        self.skill = skill
        self.city = city
        self.relocation_cost = relocation_cost
        self.training_cost = training_cost
        self.total_cost = total_cost
        self.need = need


import datetime

x = datetime.datetime.now()

date = x.strftime("%x")


def create_dummy_output():
    a = employee('1as', 'john', 'Java', 'NOIDA', 4000, 0, 4000, 'Training')
    employee_solution1 = [a, a, a]
    employee_solution2 = [a, a, a]
    employee_solution3 = [a, a]
    b = preference_list(employee_solution1, employee_solution2,
                        employee_solution3)
    return b


def create_dummy_input():
    e = employee_requirement('Java', 1, 5000)
    k = [e, e, e]
    p = project_requirement(k, 5000, 'NOIDA', date)
    return p


if __name__ == '__main__':
    app.run(debug=True)
