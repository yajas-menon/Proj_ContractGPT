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
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzc0MjgyMDUtODdmZi00MDQ4LWE2NDUtOTFiMzM3MjQwMjI4LyIsImlhdCI6MTcxNTkzNDI1NiwibmJmIjoxNzE1OTM0MjU2LCJleHAiOjE3MTU5Mzk1NjQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84V0FBQUFBOEdaL2g5bUIwOWlRb00wOFZXVE5vTG9FcU5OeHJrSHZ0TzM3R084YVFESWhSVTB3TlB6ZnFUMUp5Zy9MbHFXRlphTFIwREtQNHlvTERDRnVreklVNEVzem1XdXVtODdUZjY1RXQrZ1RYYz0iLCJhbXIiOlsicHdkIiwicnNhIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI5N2RmOTczMi0wMGQzLTRjYzItOWVhMy0zMTA0ZjFiYmNmYzMiLCJmYW1pbHlfbmFtZSI6IllhamFzIiwiZ2l2ZW5fbmFtZSI6Ik1lbm9uIiwiaXBhZGRyIjoiMTY3LjEwMy4yMC45MyIsIm5hbWUiOiJNZW5vbiBZYWphcyIsIm9pZCI6IjliZmVjMDZiLTk3ZjgtNGM4Yi04YmJlLTQ1ZDM5MjM0YmUxMiIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNTE4NDc2NTM3LTM3NTYzOTMwMzEtMTA3OTc2NDM4NC02NjEyMiIsInB1aWQiOiIxMDAzMjAwMzNCQTZEMDVCIiwicmgiOiIwLkFVa0FCWUpDZF8tSFNFQ21SWkd6TnlRQ0tBa0FBQUFBQUFBQXdBQUFBQUFBQUFCSkFORS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsiZHZjX21uZ2QiLCJkdmNfY21wIiwiZHZjX2RtamQiLCJrbXNpIl0sInN1YiI6InNfcWpNdFBfamZkSXlqVmJDRjdoUEYyUzVHaHlvQXZvUDNkcnZUb2EtalkiLCJ0aWQiOiI3NzQyODIwNS04N2ZmLTQwNDgtYTY0NS05MWIzMzcyNDAyMjgiLCJ1bmlxdWVfbmFtZSI6Im1lbm9uLmkueWFqYXNAaGFwcGllc3RtaW5kcy5jb20iLCJ1cG4iOiJtZW5vbi5pLnlhamFzQGhhcHBpZXN0bWluZHMuY29tIiwidXRpIjoiXzYwRWxodzZua09FMUFtZ195TEJBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.D2b2kV2AHSS-acDRKsbnOtxtZwKrNZHfJV2-Xebk_jCxQxqZZZEnTdMi155UwE26h5lA3LHFqXq2mFLe_S4CFJYDwnCBMdBi8L4VzEmXUNdiMwj7zqTMcCa8_XIbbjwb6Z9KFoQsH_ZyOaM2nCbM2qsvnorjjqrIMkZRAd1bPDWSWFU8xteudmjMMGM2HlMDpE_2bAo1GovNDuFVvuliNpf4aSpMSsvVj6xfwc9XJhSgX4DZkk8QxcaRV0fKlqD0iq3F9IBhSwgt7n54iQN7VgrpQKVlQLy1TL3grs6g97hYohDz5mIOn18HQCaOJz5q5jDqCQCZed3k-Qb4noBDKA',
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
