import types
import pandas as pd
from botocore.client import Config
from datetime import datetime, timedelta
import sys
import docplex.mp
from docplex.mp.model import Model
from io import StringIO
import json
from pandas import DataFrame
#Cplex Modeling
import warnings
warnings.simplefilter('ignore')
import cplex
from cplex.exceptions import CplexError
import os



# Defining The problem , constraints, objctives

def populatebyrow(prob):
    prob.objective.set_sense(prob.objective.sense.minimize)

    # since lower bounds are all 0.0 (the default), lb is omitted here
    prob.variables.add(obj = my_obj, ub = my_ub, names = my_colnames,types =[prob.variables.type.integer] * 4)

    # can query variables like the following bounds and names:

    # lbs is a list of all the lower bounds
    lbs = prob.variables.get_lower_bounds()

    # ub1 is just the first lower bound
    #ub1 = prob.variables.get_upper_bounds(0)

    # names is ["x1", "x3"]
    names = prob.variables.get_names([0, 2])

    rows = [[["Training","Relocation","Relocation_Training","No_Relocation_and_Training"],[1.0, 1.0,1.0,1.0,1.0]]]

    prob.linear_constraints.add(lin_expr = rows, senses = my_sense,
                                rhs = my_rhs, names = my_rownames)

    


def lpex1():
    my_prob = cplex.Cplex()
    populatebyrow(my_prob)
    my_prob.solve()
    numrows = my_prob.linear_constraints.get_num()
    numcols = my_prob.variables.get_num()
    slack = my_prob.solution.get_linear_slacks()
    x     = my_prob.solution.get_values()
   
    #Setting parameters for solution pool
    my_prob.presolve =1
    
    # Set the capacity of solution pool to 10
    my_prob.parameters.mip.pool.capacity=10
    
    #Set the intensity of solution to most aggresive one , so that more solution can be obtained
    my_prob.parameters.mip.pool.intensity =4
   # my_prob.parameters.mip.pool.replace = 2

    #Set the node limit to a very high number
    my_prob.parameters.mip.limits.populate =  2100000000
    
    #set timelimit for serching to 10 seconds 
    my_prob.parameters.timelimit = 10
    
    #Getting all possible incumbent solution
    my_prob.populate_solution_pool()
    
    
    #iterating through all possible solution
    numsol = my_prob.solution.pool.get_num()
    
    print("The solution pool contains %d solutions." % numsol)
    
    meanobjval = my_prob.solution.pool.get_mean_objective_value()
    sol_pool = []
    objval=[]
    numsol = my_prob.solution.pool.get_num()
    
    #store solutions
    for i in range(numsol):
       
        objval.append(my_prob.solution.pool.get_objective_value(i))
        x_i = my_prob.solution.pool.get_values(i)
        nb_vars=len(x_i)
        sol = []
        for k in range(nb_vars):
            sol.append(x_i[k])
        sol_pool.append(sol)
        #my_prob.solution.pool.delete(0)
    #my_prob.parameters.tune_problem
    #Selected_cand(sol_pool)
    
    #print("pools =",sol_pool)
    return sol_pool, objval

def docplex_modeling(df2, training_cost, relocation_cost, train_Relocation_cost, N_Train_Reloc,Training_req_count,Relocation_req_count,T_R_req_count,N_T_R_req_count,required_no_of_employees,Total_avialable_candidate,need_extra_solution):
    
    mdl = Model(name="Assignments")

    Training = mdl.integer_var(name="Training")
    
    Relocation = mdl.integer_var(name ="Relocation")

    Relocation_Training = mdl.integer_var(name="Relocation_Training")



    N_Train_Relocation = mdl.integer_var(name="No Relocation and Training")


    # Extra variable when required no of employees are greater then avialable emp

    variables= ['Training','Relocation','Relocation_Training''N_Train_Relocation']
    
    names=['Training','Relocation','Relocation_Training','No Relocation and Training']

    no_of_var= len(variables)

    constraints= ['Training','Relocation_Training','Relocation','N_Train_Relocation']
    
    sol=[]  # extra solutions
    
    objs =[]  # there corresponding costs


    #Adding constraints
    
    # assign Training variable to only those who need training
    mdl.add_constraint(Training <= Training_req_count)  
    
    # assign Relocation variable to only those who need Relocation
    mdl.add_constraint(Relocation <= Relocation_req_count)
    
    
    mdl.add_constraint(N_Train_Relocation<=N_T_R_req_count)
    
    
    mdl.add_constraint(Relocation_Training <= T_R_req_count)
    
        
    
    ct_no_of_req =mdl.add_constraint((Relocation + Relocation_Training + Training + N_Train_Relocation)==required_no_of_employees)
    
    
    
    #Defining total cost
    tot_cost=training_cost * Training + relocation_cost * Relocation + train_Relocation_cost * Relocation_Training + N_Train_Reloc *N_T_R_req_count
    
    
    
    mdl.add_kpi(tot_cost,'tot_cost') #add kpi
    
    
    #If two more solutions are required
    
    
    if need_extra_solution==2:
        
        #Defining extra constraints
        if Relocation_req_count > 0.05 * required_no_of_employees:
            mdl.add_constraint(Relocation>=0.05 * required_no_of_employees)
            
        if Training_req_count >=0.10 * required_no_of_employees:
            mdl.add_constraint(Training >=0.10 * required_no_of_employees)
        
        if T_R_req_count>=0.05 * required_no_of_employees:
            mdl.add_constraint(Relocation_Training >= 0.05 * T_R_req_count)
        
        mdl.minimize(tot_cost)
        
        mdl.solve()
        ls=[]
        #print('SECOND SOLUTION')
        #appending cost
        objs.append(mdl.solution.get_objective_value())
        for i in range(no_of_var):
            
            value=mdl.get_var_by_index(i).solution_value
            if value!=0:
                print(names[i]+' :'+str(value))
            ls.append(value)
            
        
        
        sol.append(ls)  #appending solution
        #mdl.print_solution()
    if Relocation_req_count>= required_no_of_employees*0.10:
        mdl.add_constraint(Relocation>=required_no_of_employees*0.10)
        
    #mdl.add_constraint(Training >=0.10 * Training_req_count)
    #mdl.add_constraint(Relocation_Training >= 0.10 * T_R_req_count)
    mdl.minimize(tot_cost)
    
    Selected_data = pd.DataFrame(columns=df2.columns)
#optimal solution
    print('Other solutions')
    if True:
        mdl.solve()
        #mdl.print_solution()
        ls=[]
        objs.append(mdl.solution.get_objective_value())
        for i in range(no_of_var):
            value=mdl.get_var_by_index(i).solution_value
            if value!=0:
                print(names[i]+' :'+str(value))
            ls.append(value)
            #Selected_data= Selected_data.append(pd.DataFrame(df2[df2['Need']==names[i]].head(int(value))))
        sol.append(ls)
    return sol,objs

def func(x,y):
    if x!=0 or y!=0:
        if x!=0 and y!=0:
            return 'Relocation_Training'
        elif x!=0:
            return "Training"
        elif y!=0:
            return "Relocation"
    else:
        return "No Relocation and Training"
        

        
class employees:
    
    def __init__(self, id,skill,city,relocation_cost,training_cost,total_cost,need):
        
        self.id=id
        self.skill=skill
        self.city=city
        self.relocation_cost=relocation_cost
        self.training_cost=training_cost
        self.total_cost=total_cost
        self.need=need
        
        
#main
def main(obj):
    # load csv and get the relevant columns
    df = pd.read_csv("GBSSampleData2.csv",header=0,encoding="ISO-8859-1")
    df1=df[["Serial","CNUM","Practitioner Notes ID","Primary Skill Set","Availability Date","Band","Country","Resource Work City"]]
    
    # hard code the external inputs for now
    global  required_no_of_employees 
    required_no_of_employees  = obj.employees.head_count
    global  required_location
    required_location = obj.location
    global  required_skills
    required_skills = obj.employees.skill_name
    global  required_in_days
    required_in_days = 60
    global training_cost
    training_cost = obj.employees.training_cost
    global  relocation_cost
    relocation_cost = obj.relocation_cost
    global hiring_cost
    hiring_cost = 75000
    
    # calculate intermediaries
    global target_date
    target_date =  datetime. today() + timedelta(required_in_days)
    target_date_minus_30 = target_date - timedelta(30)
    target_date_plus_30 = target_date + timedelta (30)
    # copy only rows where emp availability date is earlier than target date  
    df1 = df1.dropna(how = 'all') 
    # take care of formatting the orginial Availability Date before copying. Hardcoding format for now
    df_filtered = df1[df1["Availability Date"] <= target_date.strftime("%d-%m-%Y")]
    
    df_filtered['Relocation Cost'] = [relocation_cost if x != required_location.upper() else 0 for x in df_filtered['Resource Work City']]
    df_filtered['Training Cost'] = [training_cost if (y.find(required_skills)==-1) else 0 for y in df_filtered['Primary Skill Set']]
    df_filtered['Total Cost'] = df_filtered['Relocation Cost'] + df_filtered['Training Cost']

    df1=df_filtered[["CNUM","Primary Skill Set","Resource Work City","Relocation Cost","Training Cost","Total Cost"]]
    df2=df1.copy()       
    df2['Need']=df2.apply(lambda x: func(x['Training Cost'],x['Relocation Cost']),axis=1)
    df2=df2.reset_index(drop= True)
    global Training_req_count, Relocation_req_count, T_R_req_count, N_T_R_req_count, Total_avialable_candidate, train_Relocation_cost
    Training_req_count=len(df2[df2['Need']=='Training'])
    Relocation_req_count = len(df2[df2['Need']=='Relocation'])
    T_R_req_count= len(df2[df2['Need']=='Relocation_Training'])
    N_T_R_req_count=len(df2[df2['Need']=='No Relocation and Training'])
    Total_avialable_candidate =Training_req_count+ Relocation_req_count + T_R_req_count + N_T_R_req_count
    
    #initialising the variable for hiring 
    Need_To_Hire=0

    #Checking Condition
    if required_no_of_employees > Total_avialable_candidate:
        Need_To_Hire = required_no_of_employees-Total_avialable_candidate
        #print(Need_To_Hire)
        #Assign all the avialable 
        required_no_of_employees= Total_avialable_candidate

    # data common to all populateby functions


    train_Relocation_cost= training_cost + relocation_cost
    global N_Train_Reloc
    N_Train_Reloc =0

    global my_obj, my_ub, my_colnames, my_rhs, my_rownames, my_sense
    my_obj      = [training_cost, relocation_cost, train_Relocation_cost, N_Train_Reloc]

    #Setting Upperbounds of values of all the variables
    my_ub       = [Training_req_count, Relocation_req_count, T_R_req_count,N_T_R_req_count ]
    my_colnames = ["Training", "Relocation", "Relocation_Training","No_Relocation_and_Training"]

    my_rhs      = [required_no_of_employees]
    my_rownames = ["c1"]
    my_sense    = "E"

    #DataFrame for storing final candiates names
    Selected_data=pd.DataFrame(columns=df2.columns)
    sol_pool, objval =lpex1()

    # sol_pool - contains the no of employess assigned for training, relocation etc i.e solution
    # odjval - conatains list of total cost for each assignment



    if sol_pool:


        #if solution pool provides three solutions


        #if cplex solver provides two solutions
        if len(sol_pool)==2:


            sols,objs=(docplex_modeling(df2,training_cost, relocation_cost, train_Relocation_cost, N_Train_Reloc,Training_req_count,Relocation_req_count,T_R_req_count,N_T_R_req_count,required_no_of_employees,Total_avialable_candidate,need_extra_solution=1))

            # mergining the solution from cplex and docplex

            sol_pool=[y for x in [sol_pool, sols] for y in x]  

            objval =[y for x in [objval, objs] for y in x]


        #if cplex solver solution provides single solution
        else:

            #add hiring cost to total cost
            objval[0]=objval[0] + hiring_cost * Need_To_Hire



            #required no of employess are greater than avialable , then there can be only one solution possible
            if Need_To_Hire!=0:
                print('Hire :',Need_To_Hire)

            else:

                #if required no of employees are not greater than available, and provide single solution , enhanced the search space for two solution

                sols, objs=(docplex_modeling(df2, training_cost, relocation_cost, train_Relocation_cost, N_Train_Reloc, Training_req_count,Relocation_req_count,T_R_req_count,N_T_R_req_count,required_no_of_employees,Total_avialable_candidate,need_extra_solution=2))

                sol_pool=[y for x in [sol_pool, sols] for y in x]

                objval =[y for x in [objval, objs] for y in x]


                

        #final solution
        if len(sol_pool)==3:
            array_of_file_sol =[]
            for i in range(3):
                Selected_data=pd.DataFrame(columns=df2.columns)
                print('\n\nSolution '+ str(i+1))
                print('Total cost',objval[i])
                for j in range(len(sol_pool[i])):
                    value = sol_pool[i][j]
                    if value!=0:
                        Selected_data= Selected_data.append(pd.DataFrame(df2[df2['Need']==my_colnames[j]].head(int(value))))
                        print(my_colnames[j]+' : ' + str(value))
                Selected_data = Selected_data.reset_index(drop= True)
                sol = 'Solution '+ str(i+1)+' .csv'
                emp_file_sol = []
                #output
                for k in range(len(Selected_data)):
                    emp_id=Selected_data['CNUM'][k]
                    emp_skill=Selected_data['Primary Skill Set'][k]
                    emp_city=Selected_data['Resource Work City'][k]
                    rel_cost=Selected_data['Relocation Cost'][k]
                    train_cost=Selected_data['Training Cost'][k]
                    total_cost=Selected_data['Total Cost'][k]
                    need=Selected_data['Need'][k]
                    emp_file_sol.append(employees(emp_id,emp_skill,emp_city,rel_cost,train_cost,total_cost,need))
                array_of_file_sol.append(emp_file_sol)
                Selected_data.to_csv(sol)
                
                print('\n')
        return array_of_file_sol

class employee_requirement:
    def __init__(self, skill_name, head_count, training_cost):
        self.skill_name = skill_name
        self.head_count = head_count
        self.training_cost = training_cost
emp=employee_requirement('java',18,1000)


class project_requirement:
    def __init__(self, employee_requirement, relocation_cost, loc, start_date):
        self.employees = employee_requirement
        self.relocation_cost = relocation_cost
        self.location = loc
        self.start_date = start_date
#eList =[]
#eList.append(emp)
#eList.append(emp2)
obj=project_requirement(emp,2000,'Gurgaon','2-6-2020')
data  =main(obj)
for file in data:
    for row in file:
        print(row.id)
    print("-------------------------\n-------------------")