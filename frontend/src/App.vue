<template>
  <div id="app">
    <h1>Click in the Box to Capture Coordinates</h1>
    <!-- Square box to capture clicks -->
    <div class="box" @click="captureCoordinates">
      <p>Click anywhere inside this box</p>
    </div>
    <div v-if="coordinates" class="coordinates-display">
      <p>Coordinates: X = {{ coordinates.x }}, Y = {{ coordinates.y }}</p>
    </div>
    <button v-if="coordinates" @click="saveCoordinates">
      Save Coordinates
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      coordinates: null
    };
  },
  methods: {
    captureCoordinates(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        this.coordinates = { x, y };
        console.log(`Captured coordinates: X=${x}, Y=${y}`);
    },
    saveCoordinates() {
        if (this.coordinates) {
            axios.post('http://localhost:5000/api/coordinates', this.coordinates)
                .then(response => {
                    console.log(response.data.message);
                    alert('Coordinates saved successfully');
                })
                .catch(error => {
                    console.error('Error saving coordinates:', error);
                    alert('Failed to save coordinates');
                });
            }
        }
    }
};
</script>

<style scoped>
.box {
  width: 300px;
  height: 300px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 20px auto;
  font-size: 16px;
}

.coordinates-display {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>