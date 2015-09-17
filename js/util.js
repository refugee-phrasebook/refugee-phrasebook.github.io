 
/*
// Assign handlers immediately after making the request,
// and remember the jqxhr object for this request
var jqxhr = $.getJSON( "example.json", function() {
  console.log( "success" );
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
 
// Perform other work here ...
 
// Set another completion function for the request above
jqxhr.complete(function() {
  console.log( "second complete" );
});

  */
  
  
// r = jQuery.parseJSON(json)
// alert(Object.keys(r))

function populateTable (source, target, transcription){
  var lexemes
  
  var jqxhr = $.getJSON( "data/lexemes.json", function() {
    r = $.parseJSON(jqxhr.responseText);
    console.log( "success" );
  })
    .success(function() {
      lexemes = r["lexemes"]   
      data = []
      src = source//"serb1234"
      tgt = target//"stan1234"
      trs = transcription//"cyrtrans"
      for(i=0;i<r["lexemes"].length;i++){
	    lexeme = r["lexemes"][i]
	    id = lexeme["ID"]
// 	    console.log(id)
	    domain = lexeme["domain"]
	    lgs = lexeme["lgs"]
	    s = lgs[src]["orthographic"]
	    t = lgs[tgt]["orthographic"]
	    console.log(lgs[tgt])
	    phon = lgs[tgt]["transcriptions"][trs]
	    d = {"ID":id,
	      "source":s,
	      "target":t,
	      "phonetic":phon,
	      "domain":domain
	      }
	    data.push(d)
	    datax = {"data":data}
      }
      alert($('#jsonpopulate'))
      $('#jsonpopulate').DataTable( {
	  data:datax,
	      columns: [
		  { data: 'ID' },
		  { data: 'source' },
		  { data: 'target' },
		  { data: 'phonetic' },
		  { data: 'domain' }
		]
	  } );
      })  
}

window.onload = function()      { 
//load all known languages
Object.keys(lgs).forEach(function(lg) {
// 		console.log(lg)
		s = '<option value="'+lg+'">'+lg+'</option>'
// 		console.log(s)
    $('#lgselector').append(s)
});

// initialize table 
$('#varpopulate').DataTable( {
data:lgs[Object.keys(lgs)[0]](),
    columns: [
        { data: 'source' },
        { data: 'target' },
        { data: 'phonetic' },
        { data: 'domain' }
    ]
} ); 

v = $('#lgselector').children()[0].value 
updatetable(v)
}

function updatetable(v){ 
    $('#varpopulate').DataTable( {
    destroy: true,
    data:lgs[v](),
	columns: [
	    { data: 'source' },
	    { data: 'target' },
	    { data: 'phonetic' },
	    { data: 'domain' }
	]
    } ); 
    } 