export default function getEditedInputValue(value, altValue) {
  return value || value === '' ? value : altValue;
}