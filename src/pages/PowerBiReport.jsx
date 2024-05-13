// import React, { useEffect } from 'react';
// // import { models } from 'powerbi-client';

// const PowerBIReport = () => {
  

//   return <div className='flex items-center justify-center h-screen mt-10 my-10'>
//     <iframe title="GPT_Report" width="100vw" height="100vh" src="https://app.powerbi.com/reportEmbed?reportId=8fdc2f03-68b0-4c99-b1bf-a4c859803ec0&autoAuth=true&ctid=77428205-87ff-4048-a645-91b337240228" frameborder="0" allowFullScreen="true"></iframe>
//   </div>;
// };

// export default PowerBIReport;

import React, { useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client';
import './PoweBiReport.css';
import Navbar from '../components/Navbar';

const PowerBIReport = () => {
 

  return (
    <div>
        <Navbar />
  <div className='flex items-center justify-center h-screen mt-10 my-10'>
    
  <PowerBIEmbed
	embedConfig = {{
        type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
		id: '8fdc2f03-68b0-4c99-b1bf-a4c859803ec0',
		embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=8fdc2f03-68b0-4c99-b1bf-a4c859803ec0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzc0MjgyMDUtODdmZi00MDQ4LWE2NDUtOTFiMzM3MjQwMjI4LyIsImlhdCI6MTcxNTUzNTIzMiwibmJmIjoxNzE1NTM1MjMyLCJleHAiOjE3MTU1NDAxNDMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84V0FBQUFMZnQ4T0p3dFRoNGd5NlZUenJ4enVDNXhEcVJxZHNIOG9zZEhHQlhTcjEvcGtsazBpREdYNE5xNUR5cXJQcDF5WnRxT1g3TU9UdzZ5cWYrYnJMTWhMMDZTNldqUlBxMDZVanV6S3R1V085az0iLCJhbXIiOlsicHdkIiwicnNhIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZGV2aWNlaWQiOiI5N2RmOTczMi0wMGQzLTRjYzItOWVhMy0zMTA0ZjFiYmNmYzMiLCJmYW1pbHlfbmFtZSI6IllhamFzIiwiZ2l2ZW5fbmFtZSI6Ik1lbm9uIiwiaXBhZGRyIjoiMTY3LjEwMy4yMi45MyIsIm5hbWUiOiJNZW5vbiBZYWphcyIsIm9pZCI6IjliZmVjMDZiLTk3ZjgtNGM4Yi04YmJlLTQ1ZDM5MjM0YmUxMiIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNTE4NDc2NTM3LTM3NTYzOTMwMzEtMTA3OTc2NDM4NC02NjEyMiIsInB1aWQiOiIxMDAzMjAwMzNCQTZEMDVCIiwicmgiOiIwLkFVa0FCWUpDZF8tSFNFQ21SWkd6TnlRQ0tBa0FBQUFBQUFBQXdBQUFBQUFBQUFCSkFORS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsiZHZjX21uZ2QiLCJkdmNfY21wIiwiZHZjX2RtamQiLCJrbXNpIl0sInN1YiI6InNfcWpNdFBfamZkSXlqVmJDRjdoUEYyUzVHaHlvQXZvUDNkcnZUb2EtalkiLCJ0aWQiOiI3NzQyODIwNS04N2ZmLTQwNDgtYTY0NS05MWIzMzcyNDAyMjgiLCJ1bmlxdWVfbmFtZSI6Im1lbm9uLmkueWFqYXNAaGFwcGllc3RtaW5kcy5jb20iLCJ1cG4iOiJtZW5vbi5pLnlhamFzQGhhcHBpZXN0bWluZHMuY29tIiwidXRpIjoiNXVWWlBUWFZqVU9wdUVkSjY5blJBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.bop8HjHM87bfVVAXj6jCPWRMMulhk1hz4GBR4UcDwmqDBPSfc3Y2ruif8UFzu61-N1i6xyFQIwUuKm-mPvuwqahezRzcN8LASR1m-UBTq-Sj6hRqOXPT2sziaInBGq08TzMEphLW1LWVzpaLDLB6tYpZRJIC-XKfRbxeqdNrC8PG3r5hG0rGPMvCfa4tiR9qWy7Zul-Lye_B3yQPUdxoQwTmPF_ezOcC67rwdJmoC9f-1HYpknt1RKMq6hWb8UuSrq411HL6rR-fvLrEk9v1nQpepdtK0Ac9wtC6tuV2yUqa96UMs7yKTVohwPDDqw96YeiKZXKowtiA8ap2Ogs7CA',
		tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
		settings: {
            panes: {
                filters: {
                    expanded: false,
					visible: false
				}
			},
		}
	}}
    
	eventHandlers = {
        new Map([
            ['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}],
			['visualClicked', () => console.log('visual clicked')],
			['pageChanged', (event) => console.log(event)],
		])
	}
    
	cssClassName = { "Embed-Container" }
    
	getEmbeddedComponent = { (embeddedReport) => {
        window.report = embeddedReport;
	}}
/>
    </div>
    </div>
  )
};

export default PowerBIReport;
