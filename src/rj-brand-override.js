/**
 * RJ Business Solutions Brand Override Script
 * Replaces TypingMind branding with RJ Business Solutions branding
 * Author: Rick Jefferson - AI Systems Architect
 */

(function() {
  'use strict';
  
  // Text replacement mappings
  const textReplacements = {
    'TypingMind': 'RJ AI Chat',
    'Welcome to TypingMind!': 'Welcome to RJ Business Solutions AI Chat!',
    'A powerful frontend for LLMs': 'Enterprise-grade AI chat interface by Rick Jefferson',
    'Tony Dinh': 'Rick Jefferson',
    'TypingMind —': 'RJ Business Solutions AI Chat —',
    'TypingMind Chat': 'RJ AI Chat Platform'
  };
  
  // Function to replace text content in text nodes
  function replaceTextInNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let originalText = node.textContent;
      let newText = originalText;
      
      for (const [oldText, replacement] of Object.entries(textReplacements)) {
        newText = newText.replace(new RegExp(oldText, 'gi'), replacement);
      }
      
      if (newText !== originalText) {
        node.textContent = newText;
        console.log('[RJ Brand Override] Replaced:', originalText, '→', newText);
      }
    }
  }
  
  // Function to walk through all nodes and replace text
  function walkAndReplace(node) {
    replaceTextInNode(node);
    
    for (let child of node.childNodes) {
      walkAndReplace(child);
    }
  }
  
  // Function to update document title
  function updateTitle() {
    if (document.title.includes('TypingMind')) {
      document.title = document.title.replace(/TypingMind/gi, 'RJ Business Solutions AI Chat');
      console.log('[RJ Brand Override] Updated document title:', document.title);
    }
  }
  
  // Function to observe and replace new content
  function startObserving() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            walkAndReplace(node);
          }
        });
      });
      updateTitle();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    console.log('[RJ Brand Override] MutationObserver started');
  }
  
  // Initial replacement when DOM is ready
  function initialReplace() {
    console.log('[RJ Brand Override] Starting initial text replacement...');
    walkAndReplace(document.body);
    updateTitle();
    console.log('[RJ Brand Override] Initial replacement complete');
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initialReplace();
      startObserving();
    });
  } else {
    initialReplace();
    startObserving();
  }
  
  // Also run on window load for additional safety
  window.addEventListener('load', function() {
    setTimeout(function() {
      initialReplace();
      console.log('[RJ Brand Override] Post-load replacement complete');
    }, 1000);
  });
  
  // Additional periodic checks for dynamically loaded content
  setInterval(function() {
    updateTitle();
    // Check for any new TypingMind references
    const elementsWithTypingMind = document.querySelectorAll('*');
    elementsWithTypingMind.forEach(element => {
      if (element.textContent && element.textContent.includes('TypingMind')) {
        walkAndReplace(element);
      }
    });
  }, 5000);
  
  console.log('[RJ Brand Override] Script loaded successfully');
})();