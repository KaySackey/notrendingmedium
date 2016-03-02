// ==UserScript==
// @name         Medium.com without trending scripts
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description Don't show trending on Medium.com posts
// @author       Kay Sackey
// @match        https://medium.com/
// @grant        MIT
// ==/UserScript==
/* jshint -W097 */
'use strict';
// Your code here...

(function(){
        
let target = document.querySelector('.js-homeStream');

if (!target){
    return false;
}
    
let removeTrendingPosts = function(subtree){     
   if ( !(subtree) ){ return false; }    
   Array.from(subtree.querySelectorAll('.postMetaInline'))  
       .filter(function(meta){ return meta.textContent == 'Trending on Medium'})
       .filter(function(meta){return meta.closest('.streamItem')})
       .forEach(function(meta){ meta.closest('.streamItem').hidden = true; });
   // It ran w/o errors 
   return true;
}

// Run it once at least
removeTrendingPosts(target);

// Set up observer to check on mutuations
// This should be fast since it only checks which items are mutated
let observer = new MutationObserver(function(mutations) {
  for (m of mutations){
    Array.from(m.addedNodes).forEach(removeTrendingPosts);
  }
});

observer.observe(target,  { childList: true });
})();


