window.onload = function(){  
  //load all known languages
// //   Object.keys(lgs).forEach(function(lg) { 
// //                   s = '<option value="'+lg+'">'+lg+'</option>' 
// //       $('#lgselector').append(s)
// //   });

  //set table to first language in selection
//   v = $('#lgselector').children()[0].value 
  updatetable('apc','deu','arabtrans')
}

 

function updatetable(src,target,phon){ 
    var data = json2jsdatatables(src,target,phon)    
//     console.log(data)
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
//  console.log(source,target,trans)
    //return array of arrays [ID, src,target,phonetic, domain]
  var lexemesjson = $.getJSON("/rpb/data/lexemes.json");
  alert(7)
//   console.log(1)
//   console.log(lexemesjson.responseText)
//   console.log(2)
  lexemes = JSON.parse(lexemesjson.responseText)
//   console.log(lexemes)
  console.log(lexemes)  
  result = []
  keys = Object.keys(lexemes)
//   console.log(keys)
//   console.log(keys.length)
  i = 0
//   for (var i=0;i<keys.length;i++){
  for (var i=0;i<keys.length;i++){
    key = keys[i]
//     console.log(key)
    var lexeme = lexemes[key]
//     console.log(lexeme)
console.log(lexeme.ID)
ID = lexeme.ID
//     ID = i
//     i++
//     console.log(ID)
//     console.log(source)
//     console.log(target)
//     console.log(lexeme.lgs)
//     console.log(lexeme['lgs'])
//     console.log(Object.keys(lexeme['lgs']))
    keys2 = Object.keys(lexeme['lgs'])
//     console.log(keys)
    var targetpos = false
    var sourcepos = false
    for (var j = 0; j<keys2.length;j++){
      if (source==keys2[j]){
        sourcepos = j
      }
      if (target==keys2[j]){
        targetpos=j
      }
    }
    console.log(sourcepos,targetpos)
//     console.log(lexeme.lgs[1])
//     console.log(lexeme.lgs.deu)
//     console.log(lexeme.lgs['deu'])
//     console.log(lexeme['lgs']['deu'])
//     console.log(lexeme['lgs'][Object.keys(lexeme['lgs'])[sourcepos]])
//     console.log(4)
//     console.log(lexeme['lgs'][Object.keys(lexeme['lgs'])[targetpos]])
//     console.log(lexeme['lgs'].deu)
//     alert("languages are hardcoded")
    sourcestring = lexeme['lgs'][Object.keys(lexeme['lgs'])[sourcepos]]['orthographic']
    targetstring = lexeme['lgs'][Object.keys(lexeme['lgs'])[targetpos]]['orthographic']
    transcription =  lexeme['lgs'][Object.keys(lexeme['lgs'])[targetpos]]['transcriptions'][trans]
    domain = lexeme['domain']
    result.push({'ID':ID,'source':sourcestring,'target':targetstring,'phonetic':transcription,'domain':domain})
  }
  return result
}


$('tr').on('click',function(){
 $(this).class('') 
})