window.onload = function(){  
  //load all known languages
// //   Object.keys(lgs).forEach(function(lg) { 
// //                   s = '<option value="'+lg+'">'+lg+'</option>' 
// //       $('#lgselector').append(s)
// //   });

  //set table to first language in selection
//   v = $('#lgselector').children()[0].value 
  updatetable('eng','deu','SAMPA')
}

 

function updatetable(src,target,phon){ 
    var data = json2jsdatatables(src,target,phon)
    $('#transtable').DataTable( {
    destroy: true,
    data:data,
    language:{ "url": "../assets/notext.json"},       
    pageLength:100, 
    lengthMenu:[10, 25, 50, 75, 100, 500],
    columns: [
        { data: 'ID' },
        { data: 'source' },
	{ data: 'target' },
	{ data: 'phonetic' },
	{ data: 'domain' }
      ]
    } ); 
    } 
    
function json2jsdatatables(source,target,trans){
    //return array of arrays [ID, src,target,phonetic, domain]
  var lexemesjson = $.getJSON("/rpb/data/lexemes.json");
  alert(7)
  console.log(1)
  console.log(lexemesjson.responseText)
  console.log(2)
  lexemes = JSON.parse(lexemesjson.responseText)
//   console.log(lexemes)
  console.log(lexemes)  
  result = []
  keys = Object.keys(lexemes)
  console.log(keys)
  console.log(keys.length)
  i = 0
  for (var i=0;i<keys.length;i++){
    key = keys[i]
    console.log(key)
    var lexeme = lexemes[key]
    console.log(lexeme)
    ID = i
    i++
    console.log(ID)
    console.log(source)
    console.log(lexeme.lgs)
    console.log(lexeme['lgs'])
    console.log(Object.keys(lexeme['lgs']))
    console.log(lexeme.lgs[1])
    console.log(lexeme.lgs.deu)
    console.log(lexeme.lgs['deu'])
    console.log(lexeme['lgs']['deu'])
    console.log(lexeme['lgs'][source])
    console.log(lexeme['lgs'].deu)
    alert("languages are hardcoded")
    sourcestring = lexeme['lgs']['deu']['orthographic']
    targetstring = lexeme['lgs']['deu']['orthographic']
    transcription =  lexeme['lgs']['deu']['transcriptions'][trans]
    domain = lexeme['domain']
    result.push({'ID':ID,'source':sourcestring,'target':target,'phonetic':transcription,'domain':domain})
  }
  return result
}