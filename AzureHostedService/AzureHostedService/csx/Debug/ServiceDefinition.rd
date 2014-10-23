<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="AzureHostedService" generation="1" functional="0" release="0" Id="be1629dc-a532-4f30-b091-cd84cef80cbb" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="AzureHostedServiceGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="DataService:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/AzureHostedService/AzureHostedServiceGroup/LB:DataService:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="DataService:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="">
          <maps>
            <mapMoniker name="/AzureHostedService/AzureHostedServiceGroup/MapDataService:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </maps>
        </aCS>
        <aCS name="DataServiceInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/AzureHostedService/AzureHostedServiceGroup/MapDataServiceInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:DataService:Endpoint1">
          <toPorts>
            <inPortMoniker name="/AzureHostedService/AzureHostedServiceGroup/DataService/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapDataService:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" kind="Identity">
          <setting>
            <aCSMoniker name="/AzureHostedService/AzureHostedServiceGroup/DataService/Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </setting>
        </map>
        <map name="MapDataServiceInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/AzureHostedService/AzureHostedServiceGroup/DataServiceInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="DataService" generation="1" functional="0" release="0" software="c:\users\admin\documents\visual studio 2013\Projects\AzureHostedService\AzureHostedService\csx\Debug\roles\DataService" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaIISHost.exe " memIndex="1792" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="57242" />
            </componentports>
            <settings>
              <aCS name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="" />
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;DataService&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;DataService&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DataService.svclog" defaultAmount="[1000,1000,1000]" defaultSticky="true" kind="Directory" />
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/AzureHostedService/AzureHostedServiceGroup/DataServiceInstances" />
            <sCSPolicyUpdateDomainMoniker name="/AzureHostedService/AzureHostedServiceGroup/DataServiceUpgradeDomains" />
            <sCSPolicyFaultDomainMoniker name="/AzureHostedService/AzureHostedServiceGroup/DataServiceFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyUpdateDomain name="DataServiceUpgradeDomains" defaultPolicy="[5,5,5]" />
        <sCSPolicyFaultDomain name="DataServiceFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="DataServiceInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="db04e5f6-4e71-4c88-adb2-dbf4537d8234" ref="Microsoft.RedDog.Contract\ServiceContract\AzureHostedServiceContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="3580e758-6939-4082-9d18-ab3ca1f25603" ref="Microsoft.RedDog.Contract\Interface\DataService:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/AzureHostedService/AzureHostedServiceGroup/DataService:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>