
window.onscroll = function() {
  var chapterNames = Object.keys(contents);
  for (var i = 0; i < chapterNames.length; i++) {
  var chapterName = chapterNames[i];
  if (isElementOnScreen(chapterName)) {
  setActiveChapter(chapterName);
  break;
  }
  }
  };
 
//begin from the 'starts' section
  var activeChapterName = 'STARS';
// fly to the 
  function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;
   
  mymap.flyTo(contents[chapterName]);
   
  document.getElementById(chapterName).setAttribute('class', 'active');
  document.getElementById(activeChapterName).setAttribute('class', '');
   
  activeChapterName = chapterName;
  }
   
  function isElementOnScreen(id) {
  var element = document.getElementById(id);
  var bounds = element.getBoundingClientRect();
  console.log(bounds);
  return bounds.top < window.innerHeight && bounds.bottom > 0;
  }      