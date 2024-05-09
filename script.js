const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValues = document.getElementById('input_values').value.trim().split(',');
  const inputData = {
    baseline_value: inputValues[0],
    accelerations: inputValues[1],
    fetal_movement: inputValues[2],
    uterine_contractions: inputValues[3],
    light_decelerations: inputValues[4],
    severe_decelerations: inputValues[5],
    prolongued_decelerations: inputValues[6],
    abnormal_short_term_variability: inputValues[7],
    mean_value_of_short_term_variability: inputValues[8],
    percentage_of_time_with_abnormal_long_term_variability: inputValues[9],
    mean_value_of_long_term_variability: inputValues[10],
    histogram_width: inputValues[11],
    histogram_min: inputValues[12],
    histogram_max: inputValues[13],
    histogram_number_of_peaks: inputValues[14],
    histogram_number_of_zeroes: inputValues[15],
    histogram_mode: inputValues[16],
    histogram_mean: inputValues[17],
    histogram_median: inputValues[18],
    histogram_variance: inputValues[19],
    histogram_tendency: inputValues[20]
  };

  fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: inputData }),
  })
 .then((response) => response.json())
 .then((result) => {
    document.getElementById('result').innerHTML = `Predicted Labels: ${result.predicted_labels.join(', ')}`;
  })
 .catch((error) => {
    console.error(error);
  });
});