function getTextValueElement(elementId) {
  const element = document.getElementById(elementId);
  const elementTextValue = element.innerText;
  const elementText = parseFloat(elementTextValue);
  return elementText;
}
