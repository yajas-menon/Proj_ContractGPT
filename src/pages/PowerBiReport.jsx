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
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzc0MjgyMDUtODdmZi00MDQ4LWE2NDUtOTFiMzM3MjQwMjI4LyIsImlhdCI6MTcxNTI0NDQ3NywibmJmIjoxNzE1MjQ0NDc3LCJleHAiOjE3MTUyNDk1ODEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84V0FBQUFoaXd5eTlnQXpPa0ZMMWhrdHpmQnNQaUVkcTRxdWJubE9KNW00QzhFZ0ZseEZ0QkpaRFFjNEdXOTBNNk1ocEQ5M0RvcjgyOUR4MTJrZzRTb2ttbkg3NGJZV01JRkJFREhlSUd5dlR5cnh6QT0iLCJhbXIiOlsicHdkIiwicnNhIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI5N2RmOTczMi0wMGQzLTRjYzItOWVhMy0zMTA0ZjFiYmNmYzMiLCJmYW1pbHlfbmFtZSI6IllhamFzIiwiZ2l2ZW5fbmFtZSI6Ik1lbm9uIiwiaXBhZGRyIjoiMTY3LjEwMy4yMC45OSIsIm5hbWUiOiJNZW5vbiBZYWphcyIsIm9pZCI6IjliZmVjMDZiLTk3ZjgtNGM4Yi04YmJlLTQ1ZDM5MjM0YmUxMiIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNTE4NDc2NTM3LTM3NTYzOTMwMzEtMTA3OTc2NDM4NC02NjEyMiIsInB1aWQiOiIxMDAzMjAwMzNCQTZEMDVCIiwicmgiOiIwLkFVa0FCWUpDZF8tSFNFQ21SWkd6TnlRQ0tBa0FBQUFBQUFBQXdBQUFBQUFBQUFCSkFORS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsiZHZjX21uZ2QiLCJkdmNfY21wIiwiZHZjX2RtamQiLCJrbXNpIl0sInN1YiI6InNfcWpNdFBfamZkSXlqVmJDRjdoUEYyUzVHaHlvQXZvUDNkcnZUb2EtalkiLCJ0aWQiOiI3NzQyODIwNS04N2ZmLTQwNDgtYTY0NS05MWIzMzcyNDAyMjgiLCJ1bmlxdWVfbmFtZSI6Im1lbm9uLmkueWFqYXNAaGFwcGllc3RtaW5kcy5jb20iLCJ1cG4iOiJtZW5vbi5pLnlhamFzQGhhcHBpZXN0bWluZHMuY29tIiwidXRpIjoiV2o3N256Sk5sMEd5bEwxRkNCVjFBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.AM_gk8rSL-m-qU9qFPjtom-8lBb-oeDOTDv583fyFWF8cpyGnhAySCjD7sPndDlSW_C3E2DV8VeyZ9V4ZQFkPpUckLnDUz6kPv0jf3iPPP8vZ7vopnf04ZJxSz0nnNGO_dymrOB_QsGdMP3T5SoEsMRheOCWlgqkD7nYzvR6ogGwx9VnZwqaQrU_TcUmlPSFN1CU6bheH51JNJcgHM3TF8R2BiIVsHCTrTo6HOwAporSRMGR6_OJgTTn0AVv4XX_YhlpdojR1fuFzFD80Z5NE2zY1NlaG7TB0vLDc6YhGPB3TSYlehi3ooY2bToXZTswfKyuzVQSZ8kCcH5BvQMd8Q',
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
