using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace DataService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IService1
    {

        [System.Web.Services.WebMethod(BufferResponse = false)]
        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "getUnits")]
        List<getunits_Result> GetUnits();
        
        [System.Web.Services.WebMethod(BufferResponse = false)]
        [OperationContract]
        [WebInvoke(Method = "GET", 
        ResponseFormat = WebMessageFormat.Json, 
        BodyStyle = WebMessageBodyStyle.Wrapped, 
        UriTemplate = "getCars")]
        List<Car> GetCars();

        [System.Web.Services.WebMethod(BufferResponse = false)]
        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "getAllCars")]
        List<Track> GetAllCars();

        [System.Web.Services.WebMethod(BufferResponse = false)]
        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "getYarddata")]
        List<GetUnitsView> GetUnitsResults();

        [System.Web.Services.WebMethod(BufferResponse = false)]
        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "getYardjson")]
        List<Yard> GetYardJSON();

        [WebGet]
        string GetData(int value);

        [OperationContract]
        CompositeType GetDataUsingDataContract(CompositeType composite);

        // TODO: Add your service operations here
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }
}
