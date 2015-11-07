window.onload = function(){  
  //load all known languages
// //   Object.keys(lgs).forEach(function(lg) { 
// //                   s = '<option value="'+lg+'">'+lg+'</option>' 
// //       $('#lgselector').append(s)
// //   });

  //set table to first language in selection
//   v = $('#lgselector').children()[0].value 

 
iso6393dic ={ //should be given by json, not hardcoded  FIXME
"hbs":"Serbo-Croatian",
"deu":"German",
"swe":"Swedish",
"nor":"Norwegian", 
"fin":"Finnish",
"dan":"Danish",
"tir":"Tigrinya",
"spa":"Spanish",
"ita":"Italian",
"fra":"French",
"ell":"Greek",
"hun":"Hungarian",
"por":"Portuguese",
"tam":"Tamil",
"pol":"Polish",
"rus":"Russian",
"isl":"Icelandic",  
"rom":"Romanian",
"ces":"Czech",
"slk":"Slovak",
"bul":"Bulgarian",
"cat":"Catalan",
"ben":"Bangla", 
"urd":"Urdu",
"amh":"Amharic",
"slv":"Slovenian",
"vie":"Vietnamese",
"tur":"Turkish",
"hye":"Armenian", 
"prs":"Dari",
"fil":"Filipino",
"far":"Farsi",
"pus":"Pashto",
"pes":"Persian",
"mkd":"Macedonian",
"lit":"Lithuanian",
"ckb":"Sorani",
"kmr":"Kurmanji",
"sqi":"Albanian",
"som":"Somalian",
"ara":"Standard Arabic",
"apc":"Syrian Arabic", 
"nld":"Dutch"} 

$.each( iso6393dic, function( key, value ) { 
    option = '<option value="'+key+'">'+value+'</option>'
    $("#sourceselector").append(option)
    $("#targetselector").append(option)
});
  
  
  $( ".selector" ).change(function() { 
    srcvalue = $("#sourceselector").val()
    targetvalue = $("#targetselector").val()
    transcriptionvalue = $("#transcriptionselector").val()
    console.log(srcvalue,targetvalue,transcriptionvalue)
    json2jsdatatables(srcvalue,targetvalue,transcriptionvalue)
  });
  
  $( ".selector" ).change()
 
//   json2jsdatatables("apc","deu","arabtrans")
}

 

// function updatetable(src,target,phon){ 
//     var data = json2jsdatatables(src,target,phon)    
// //     console.log(data)
// 
//     } 
    
function json2jsdatatables(source,target,trans){
//  console.log(source,target,trans)
    //return array of arrays [ID, src,target,phonetic, domain]
  var lexemesjson;
  $.getJSON("./data/lexemes.json" , function( data ) { 
//     console.log(data)
  //   console.log(1)
  //   console.log(lexemesjson.responseText)
  //   console.log(2)
    lexemes = data
  //   console.log(lexemes)
  //   console.log(lexemes)  
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
  // console.log(lexeme.ID)
  ID = lexeme.ID
  //     ID = i
  //     i++
//       console.log(ID)
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
  //     console.log(sourcepos,targetpos)
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
    data2 = result
    $('#transtable').DataTable( {
    destroy: true,
    data:data2,
    language:{ "url": "./assets/notext.json"},       
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
  }) 
}