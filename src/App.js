import React, { useState, useEffect } from "react";
import ArrayVisualizer from "./components/ArrayVisualizer";
import Controls from "./components/Controls";

const App = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50); // Default size
  const [speed, setSpeed] = useState(100); // Sorting speed
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const generateNewArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 50);
    }
    setArray(newArray);
  };

  const handleSort = (algorithm) => {
    setSorting(true);
    switch (algorithm) {
      case "bubble":
        bubbleSort();
        break;
      case "merge":
        mergeSort();
        break;
      case "heap":
        heapSort();
        break;
      case "quick":
        quickSort(0, array.length - 1);
        break;
      case "insertion":
        insertionSort();
        break;
      case "selection":
        selectionSort();
        break;
      default:
        break;
    }
  };

  const bubbleSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
          setArray([...arr]);
          await delay(speed); // Wait for the animation speed
        }
      }
    }
    setSorting(false);
  };

  const mergeSort = async () => {
    let arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setSorting(false);
  };

  const mergeSortHelper = async (arr, start, end) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(arr, start, mid);
    await mergeSortHelper(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const merge = async (arr, start, mid, end) => {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    let leftIndex = 0,
      rightIndex = 0,
      mergedIndex = start;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        arr[mergedIndex] = left[leftIndex];
        leftIndex++;
      } else {
        arr[mergedIndex] = right[rightIndex];
        rightIndex++;
      }
      mergedIndex++;
      setArray([...arr]);
      await delay(speed);
    }

    while (leftIndex < left.length) {
      arr[mergedIndex] = left[leftIndex];
      leftIndex++;
      mergedIndex++;
      setArray([...arr]);
      await delay(speed);
    }

    while (rightIndex < right.length) {
      arr[mergedIndex] = right[rightIndex];
      rightIndex++;
      mergedIndex++;
      setArray([...arr]);
      await delay(speed);
    }
  };

  const heapSort = async () => {
    let arr = [...array];
    const n = arr.length;

    const heapify = async (arr, n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        await delay(speed);
        await heapify(arr, n, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i >= 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      await delay(speed);
      await heapify(arr, i, 0);
    }

    setSorting(false);
  };

  const quickSort = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSort(low, pi - 1);
      await quickSort(pi + 1, high);
    } else {
      setSorting(false);
    }
  };

  const partition = async (low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        setArray([...array]);
        await delay(speed);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    setArray([...array]);
    await delay(speed);
    return i + 1;
  };

  const insertionSort = async () => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        await delay(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setSorting(false);
  };

  const selectionSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
      await delay(speed);
    }
    setSorting(false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="sorting-visualizer-container">
      <h1>Sorting Visualizer</h1>
      <Controls
        generateNewArray={generateNewArray}
        handleSort={handleSort}
        arraySize={arraySize}
        setArraySize={setArraySize}
        speed={speed}
        setSpeed={setSpeed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        sorting={sorting}
      />
      <ArrayVisualizer array={array} />
    </div>
  );
};

export default App;
