import mysql.connector
import conection as cn


def insertData(camerainfo,data):
    cn.conection.connect

    cursor = cn.conection.cursor()
    

    query = """INSERT INTO view (
            camera_id,
            amount_car_in,
            amount_truck_in,
            amount_bus_in,
            amount_motorbike_in,
            amount_bike_in,
            amount_people_in,
            amount_car_out,
            amount_truck_out,
            amount_bus_out,
            amount_motorbike_out,
            amount_bike_out,
            amount_people_out,
            start,
            end,
            avg_speed) 
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    
    dataIn = (
        camerainfo[0],
        data.get("obj_in")["car"],
        data.get("obj_in")["truck"],
        data.get("obj_in")["bus"],
        data.get("obj_in")["motorbicycle"],
        data.get("obj_in")["bicycle"],
        data.get("obj_in")["person"],
        data.get("obj_out")["car"],
        data.get("obj_out")["truck"],
        data.get("obj_out")["bus"],
        data.get("obj_out")["motorbicycle"],
        data.get("obj_out")["bicycle"],
        data.get("obj_out")["person"],
        camerainfo[1],
        camerainfo[2],
        0,
    )
    print(camerainfo[1],camerainfo[2])
    cursor.execute(query,dataIn)
    cn.conection.commit()
    print("data inserted correctly")
    
