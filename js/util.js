window.onload = function(){    
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
    "nld":"Dutch"    
  } 

  //initialize selectors
  keys=[] //js is too stupid to sort keys of a hashtable
  $.each( iso6393dic, function( key, value ) { 
      keys.push(key);
  })
  keys.sort();

  $.each( keys, function( key ) { 
      option = '<option value="'+keys[key]+'">'+iso6393dic[keys[key]]+'</option>'
      $("#sourceselector").append(option)
      $("#targetselector").append(option)
  });
    
  //bind event to all selectors  
  $( ".selector" ).change(function() { 
      srcvalue = $("#sourceselector").val()
      targetvalue = $("#targetselector").val()
      transcriptionvalue = $("#transcriptionselector").val() 
      json2jsdatatables(srcvalue,targetvalue,transcriptionvalue)
    }); 
  
  //trigger initialization of DataTable
  $( ".selector" ).change() 
}
 
    
function json2jsdatatables(source,target,trans){ 
  //return array of arrays [ID, src,target,phonetic, domain]
//   var lexemesjson;
  $.getJSON("./data/lexemes.json" , function( lexemes ) {  
//     lexemes = data  
    tuples = []
    keys = Object.keys(lexemes) 
    i = 0 
    for (var i=0;i<keys.length;i++){
      key = keys[i] 
      var lexeme = lexemes[key] 
      ID = lexeme.ID 
      keys2 = Object.keys(lexeme['lgs']) 
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
      sourcestring = lexeme['lgs'][Object.keys(lexeme['lgs'])[sourcepos]]['orthographic']
      targetstring = lexeme['lgs'][Object.keys(lexeme['lgs'])[targetpos]]['orthographic']
      transcription =  lexeme['lgs'][Object.keys(lexeme['lgs'])[targetpos]]['transcriptions'][trans]
      domain = lexeme['domain']
      tuples.push({'ID':ID,'source':sourcestring,'target':targetstring,'phonetic':transcription,'domain':domain})
    }
//     data2 = result
    $('#transtable').DataTable( {
        destroy: true,
        data:tuples,
        language:{ "url": "./assets/notext.json"},       
        pageLength:100, 
        lengthMenu:[10, 25, 50, 75, 100, 500],
        columns: [
            { data: 'ID' },
            { data: 'source' },
            { data: 'target' },
            { data: 'phonetic' },
            { data: 'domain' }
          ],
      initComplete: function(settings, json) { 
        $('tr').click(function() {
          toggleselected($(this))
        });        
      }
    });   
  }) 
}

function toggleselected(el){
    if ( $(el).hasClass( "deselectedrow" ) == true){
      $(el).removeClass("deselectedrow" ) 
    }
    else{
      $(el).addClass("deselectedrow" ) 
    }
}