/*
  * global variable that will saves the file from input.
  * its necessary because the input type file can not get by this script.
  * its because the input is generated programmatically by "content-tools.js" and it disappear when editions are finished.
*/
var __IMAGE = ''
/*
  * global variable that will saves the image temporally.
  * its necessary to shwo image on image preview.
*/
var __TMP = ''

/*
  * function that uses AJAX via XMLHttpRequest to send request to php.
*/
function ajax(config){
  const xhr = new XMLHttpRequest()
  
  console.log(config.method, config.url, config.formData)
  for(let [key, value] of config.formData){
    console.log(key, value)
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log(this.responseText)
      // if(this.responseText && this.responseText.indexOf('__TMP') != -1){
      //   __TMP = this.responseText.slice(5,)
      // }
    }
  }

  xhr.open(config.method, config.url, true)
  xhr.send(config.formData)
}

/*
 * function to hide others videos when a new video is uploading.
 * this function is called by "content-tools.js" on line 8231.
 * you also find the edition going to "content-tools.js" and searching for "DANIEL".
*/
function hideOtherVideos(){
  document.querySelectorAll('.ce-element--type-video').forEach(element => {
    element.style.display = 'none'
    element.style.visibility = 'hidden'
  })
}

/*
 * function to delete others videos when a new video has uploaded with success.
 * this function is called by "content-tools.js" on line 5998.
 * you also find the edition going to "content-tools.js" and searching for "DANIEL".
*/
function deleteOtherVideos(){
  const iframes = document.querySelectorAll('iframe')
  for(let i = 0; i < iframes.length-1; ++i){
    iframes[i].style.visibility = 'hidden'
    iframes[i].style.display = 'none'
  }
}

/*
 * function to get image from the input file.
 * this function is called by "content-tools.js" on line 7091 when the value of "upload" input is changed.
 * you also find the edition going to "content-tools.js" and searching for "DANIEL".
*/
function getImage(){
  const input = document.querySelector('input.ct-image-dialog__file-upload')
  __IMAGE = input.files[0]
}

/*
 * function to save image temporally.
 * this function is called by "content-tools.js" on line 7196.
 * you can find the use going to "content-tools.js" and searching for "DANIEL".
*/
function saveImgTemp(file){
  const formData = new FormData()

  formData.append('imagePreview', file)

  ajax({
    method: 'POST',
    url: "http://localhost/content-tools/php/tmp.php",
    formData
  })
}

/*
  * function that set data and request the function above to send them to php.
  * this function is called by "sandbox.js" on line 151 when the green button is clicked.
*/
function updateDatabase(){
  const formData = new FormData()
  // general
  const productId = document.querySelector('#cts-productId').value
  const storeUrl = pageTest
  // freight
  const freightText = document.querySelector('#cts-freight-text').innerText
  // productslider
  const productTitle = document.querySelector('#cts-productslider-title').innerText
  const productDescription = document.querySelector('#cts-productslider-description').innerHTML
  // productvideo
  const videoTitle = document.querySelector('#cts-productvideo-title').innerText
  const videoSubtitle = document.querySelector('#cts-productvideo-subtitle').innerText
  // positives
  const positivesTitle = document.querySelector('#cts-positives-title').innerText
  const positivesSubtitle = document.querySelector('#cts-positives-subtitle').innerText
  const positives = []
  const positiveTitleList = document.querySelectorAll('p[cts-positive-id=cts-positive-title]')
  const positivesSubtitleList = document.querySelectorAll('p[cts-positive-id=cts-positive-subtitle]')
  document.querySelectorAll('div[cts-positive-container=true]').forEach((div, index) => {
    positives.push({
      positiveId: div.getAttribute('cts-positive-value'),
      positiveTitle: positiveTitleList[index].innerText,
      positiveSubtitle: positivesSubtitleList[index].innerText
    })
  })
  // long description
  const longDescription = document.querySelector('#cts-longdescription-details').innerHTML
  // testimonials
  const testimonialsTitle = document.querySelector('#cts-testimonials-title').innerText
  const testimonialsSubtitle = document.querySelector('#cts-testimonials-subtitle').innerText
  const testimonials = []
  const testimonialsTextList = document.querySelectorAll('p[cts-testimonial-id=cts-testimonial-text]')
  const testimonialsClientList = document.querySelectorAll('p[cts-testimonial-id=cts-testimonial-client]')
  const testimonialsProffisionCityList = document.querySelectorAll('p[cts-testimonial-id=cts-testimonial-profissionCity]')
  document.querySelectorAll('div[cts-testimonial-container=true]').forEach((div, index) => {
    testimonials.push({
      testimonialId: div.getAttribute('cts-testimonial-value'),
      testimonialText: testimonialsTextList[index].innerText,
      testimonialClient: testimonialsClientList[index].innerText,
      testimonialProfissionCity: testimonialsProffisionCityList[index].innerText,
    })
  })
  // variations
  const variationsTitle = document.querySelector('#cts-variations-title').innerText
  const variationsSubtitle = document.querySelector('#cts-variations-subtitle').innerText
  // common questions
  const commonQuestionsTitle = document.querySelector('#cts-commonquestions-title').innerText
  const commonQuestionsSubtitle = document.querySelector('#cts-commonquestions-subtitle').innerText
  const commonquestions = []
  const commonquestionsQuestionList = document.querySelectorAll('p[cts-commonquestions-id=cts-commonquestions-question]')
  const commonquestionsAnswerList = document.querySelectorAll('p[cts-commonquestions-id=cts-commonquestions-answer]')
  document.querySelectorAll('div[cts-commonquestions-container=true]').forEach((div, index) => {
    commonquestions.push({
      commonquestionsId: div.getAttribute('cts-commonquestions-value'),
      commonquestionsQuestion: commonquestionsQuestionList[index].innerText,
      commonquestionsAnswer: commonquestionsAnswerList[index].innerText,
    })
  })
  // section
  const sectionDetails = document.querySelector('#cts-section-deadline').innerText
  const sectionCPFCNPJ = document.querySelector('#cts-section-cpfcnpj').innerText
  const sectionEmail = document.querySelector('#cts-section-email').innerText
  const sectionWhatsapp = document.querySelector('#cts-section-whatsapp').innerText
  

  // const videoUrl = document.querySelectorAll('iframe')[this.length-1].src
  // formData.append('update', true)
  // formData.append('linkUrl', linkUrl)
  // formData.append('description', description)
  // formData.append('videoUrl', videoUrl)
  // formData.append('image', __IMAGE)
  formData.append('productId', productId)
  formData.append('storeUrl', storeUrl)
  formData.append('freightText', freightText)
  formData.append('productTitle', productTitle)
  formData.append('productDescription', productDescription)
  formData.append('videoTitle', videoTitle)
  formData.append('videoSubtitle', videoSubtitle)
  formData.append('positivesTitle', positivesTitle)
  formData.append('positivesSubtitle', positivesSubtitle)
  formData.append('positives', JSON.stringify(positives))
  formData.append('longDescription', longDescription)
  formData.append('testimonialsTitle', testimonialsTitle)
  formData.append('testimonialsSubtitle', testimonialsSubtitle)
  formData.append('testimonials', JSON.stringify(testimonials))
  formData.append('variationsTitle', variationsTitle)
  formData.append('variationsSubtitle', variationsSubtitle)
  formData.append('commonQuestionsTitle', commonQuestionsTitle)
  formData.append('commonQuestionsSubtitle', commonQuestionsSubtitle)
  formData.append('commonquestions', JSON.stringify(commonquestions))
  formData.append('sectionDetails', sectionDetails)
  formData.append('sectionCPFCNPJ', sectionCPFCNPJ)
  formData.append('sectionEmail', sectionEmail)
  formData.append('sectionWhatsapp', sectionWhatsapp)
  
  // for(let [key, value] of formData.entries()) {
  //   console.log(`${key} -> ${value}`) 
  // }

  fetch(`${baseApiUrl}/product`, {
    method: 'PUT',
    body: formData,
  })
}