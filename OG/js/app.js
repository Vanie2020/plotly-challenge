// Put ids on the dropdown   
d3.json('data.json').then((data)=>{
    var id=data.names;
    console.log(data.metadata)