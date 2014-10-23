using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace DataService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        cycle31_dbEntities1 objContext;
        public List<getunits_Result> gur = new List<getunits_Result>();

        public Service1()
        {
            objContext = new cycle31_dbEntities1(); 
        }

       
        public List<getunits_Result> GetUnits()
        {
            var us = objContext.getunits();
            foreach (var row in us)
            {
                var u = new getunits_Result()
                {
                    yard_id = row.yard_id,
                    yard_name = row.yard_name,
                    yard_location = row.yard_location,
                    track_id = row.track_id,
                    track_name = row.track_name,
                    track_length = row.track_length,
                    unit_id = row.unit_id,
                    unit_name = row.unit_name
            
                  
                };
                gur.Add(u);
            }

            
            return gur;

        }

        public List<Car> GetCars()
        {
            List<Car> retVal = new List<Car>();
            var cl = objContext.Cars;
            foreach (var row in cl)
            {
                var c = new Car()
                {
                    Car_Id = row.Car_Id,
                    Car_Initial = row.Car_Initial,
                    Car_Number = row.Car_Number,
                    Car_Type = row.Car_Type,
                    Car_Length = row.Car_Length,
                    Car_Status = row.Car_Status
                };
                retVal.Add(c);
            }

            return retVal;
        }
        public List<Track> GetAllCars()
        {
            
            List<Track> results = new List<Track>();

            foreach (Track tk in objContext.Tracks)
            {
                Track newTrack = new Track();
                newTrack.Track_Id = tk.Track_Id;
                newTrack.Track_Length = tk.Track_Length;
                newTrack.Track_Name = tk.Track_Name;
                foreach (Unit un in tk.Units)
                {
                    Unit newUnit = new Unit();
                    newUnit.Track_Id = un.Track_Id;
                    newUnit.Unit_Id = un.Unit_Id;
                    newUnit.Unit_Name = un.Unit_Name;
                    newTrack.Units.Add(newUnit);
                }

                results.Add(newTrack);

             
            }

            return results;
        }



        public List<GetUnitsView> GetUnitsResults()
            {

                List<GetUnitsView> unitresults = new List<GetUnitsView>();
                var guv = objContext.GetUnitsViews;
                foreach (var row in guv)
                {
                    var u = new GetUnitsView()
                    {
                        yard_id = row.yard_id,
                        yard_name = row.yard_name,
                        yard_location = row.yard_location,
                        track_id = row.track_id,
                        track_name = row.track_name,
                        unit_id = row.unit_id,
                        unit_name = row.unit_name,
                        car_id = row.car_id,
                        car_initial = row.car_initial,
                        car_number = row.car_number,
                        car_type = row.car_type,
                        car_length = row.car_length,
                        car_status = row.car_status
                    };

                    unitresults.Add(u);
                  
                }
                return unitresults;
            }

        public List<Yard> GetYardJSON()
        {
            List<Yard> json = new List<Yard>();
            foreach (Yard yd in objContext.Yards)
            {
                Yard newYard = new Yard();
                newYard.Yard_Id = yd.Yard_Id;
                newYard.Yard_Name = yd.Yard_Name;
                newYard.Yard_Location = yd.Yard_Location;
                foreach (Track tk in yd.Tracks)
                {
                    Track newTrack = new Track();
                    newTrack.Track_Id = tk.Track_Id;
                    newTrack.Track_Name = tk.Track_Name;
                    newYard.Tracks.Add(newTrack);
                    foreach (Unit un in tk.Units)
                    {
                        Unit newUnit = new Unit();
                        newUnit.Track_Id = un.Track_Id;
                        newUnit.Unit_Id = un.Unit_Id;
                        newUnit.Unit_Name = un.Unit_Name;
                        newTrack.Units.Add(newUnit);
                        foreach (UnitCar uc in un.UnitCars)
                        {
                            UnitCar newUC = new UnitCar();
                            newUC.Car_Id = uc.Car_Id;
                            newUC.Unit_Id = uc.Unit_Id;
                            newUnit.UnitCars.Add(newUC);
                            
                        }

                        json.Add(newYard);
                         
                    }
                   
                }
            }
            return json;
        }

        public void UpdateCars(int Id, Car obj)
        {
            var CarList = objContext.Cars.ToList();
            var CarInfo = (from Cr in CarList
                           where Cr.Car_Id == Id
                           select Cr).First();
            CarInfo.Car_Initial = obj.Car_Initial;
            CarInfo.Car_Number = obj.Car_Number;
            CarInfo.Car_Type = obj.Car_Type;
            CarInfo.Car_Length = obj.Car_Length;
            CarInfo.Car_Status = obj.Car_Status;
            objContext.SaveChanges();
        }
 

        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }
    }
}
