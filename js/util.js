window.onload = function(){ 
	
//load all known languages
Object.keys(lgs).forEach(function(lg) { 
		s = '<option value="'+lg+'">'+lg+'</option>' 
    $('#lgselector').append(s)
});

//set table to first language in selection
v = $('#lgselector').children()[0].value 
updatetable(v)
}

// // initialize table 
// $('#varpopulate').DataTable( {
// data:lgs[Object.keys(lgs)[0]](),
//     columns: [
//         { data: 'source' },
//         { data: 'target' },
//         { data: 'phonetic' },
//         { data: 'domain' }
//     ]
// } ); 


function updatetable(v){ 
    $('#transtable').DataTable( {
    destroy: true,
    data:lgs[v](),
    language:{ "url": "../assets/notext.json"},       
    pageLength:100, 
    lengthMenu:[10, 25, 50, 75, 100, 500],
    columns: [
	{ data: 'source' },
	{ data: 'target' },
	{ data: 'phonetic' },
	{ data: 'domain' }
      ]
    } ); 
    } 