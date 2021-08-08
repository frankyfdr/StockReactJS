
import 'chartjs-adapter-moment';
export const ColorSet = {
    chartColor: [

    ]
}

export const colors = ['rgb(171, 21, 128)','rgb(235, 110, 61)','rgb(48, 145, 140)','rgb(252, 231, 0)','rgb(13, 255, 0)']


export const filterCode =
    [
        { code: 'annualTotalDebt', label: 'Total Debt', periodType: '12M', checked: false },
        { code: 'annualTotalAssets', label: 'Total Assets', periodType: '12M', checked: false },

        // Income 3M
        { code: 'quarterlyTotalRevenue', label: 'Total Revenue', periodType: '3M', checked: false },
        { code: 'quarterlyCostOfRevenue', label: 'Cost of Revenue', periodType: '3M', checked: false },
        { code: 'quarterlyGrossProfit', label: 'Gross Profit', periodType: '3M', checked: false },
        { code: 'quarterlyNormalizedIncome', label: 'Net Income', periodType: '3M', checked: false },
        { code: 'quarterlyNormalizedEBITDA', label: 'EBITDA', periodType: '3M', checked: false },
        { code: 'quarterlyOperatingExpense', label: 'Operating expenses', periodType: '3M', checked: false },
        { code: 'quarterlyDilutedEPS', label: 'Diluted EPS', periodType: '3M', checked: false },
        
        // Income 12M
        { code: 'annualOperatingExpense', label: 'Operating expenses', periodType: '12M', checked: false },

        { code: 'annualTotalRevenue', label: 'Total Revenue', periodType: '12M', checked: false },
        { code: 'annualDilutedEPS', label: 'Diluted EPS', periodType: '12M', checked: false },
        
        { code: 'historicPrice', label: 'Historic Price', checked: false },
    ]

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
        radius: {
          duration: 400,
          easing: 'linear',
          loop: (context) => context.active
        }
      },
    plugins:{
        legend:{
            labels:{
                color:"white",
                pointStyle:"rectRounded",
                usePointStyle:true,
            },
            
        },
        tooltip:{
            titleAlign:'center',
            padding:15,
             usePointStyle: true,
            callbacks:{
               
                title: function(context){
                    
                    let aux =  context[0].raw.x.split('-')
                    return aux[0]+', '+aux[1]
                },
                // label: (context)=>{
                //     return 'no'
                // },
                labelPointStyle:(context)=>{
                   
                      return{
                          pointStyle:'circle',
                          rotation:0,
                          border:'1px solid black',
                          borderColor:'rgb(0, 0, 0,0)'
                      }
                    },
            }
        }
    },
    elements:{
        line:{
            borderWidth:2,
            borderColor:'red',
            borderJoinStyle: 'round'
        },
        point: {
            backgroundColor: 'blue',
            hoverBackgroundColor: 'rgb(255,255,255)',
            radius: 1,
            pointStyle:'circle',
            hoverRadius: 5,
          }
    },
    tooltips: {
        mode: 'nearest',
        // position:"nearest",
      
      
    },
    interaction: {
        intersect: false,
        mode: 'nearest',
    },
    
    scales: {
        priceY:{
            display:false,
            position:'right'
        },
        indicadorY:{
            display:false,
            position:'left'
        },
        
        xAxis: {
            type: 'timeseries',
            time: {
                unit:'year'     
            },

            tick:{
                
            }
           
          }
       
     },
}

