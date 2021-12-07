const request = indexedDB.open("workoutDB", 1);


//This creates the schema
request.onupgradeneeded = event => { 
    const db = event.target.result
    const WorkoutStore = db.createObjectStore("workoutDB", { keyPath: "workoutID", autoIncrement: true})
};

request.onsuccess = function (event) {
    db = event.target.result;
  
    if (navigator.onLine) {
      checkDatabase();
    }
  };

  //this logs an error
  request.onerror = function (event) {
    console.log(`Error! ${event.target.errorCode}`);
  };


function saveRecord(record) {
    //This creates a workout on the pending db with readwrite access
    const workout = db.workout(["workoutDB"], "readwrite")
    //this accesses your pending object store
    const WorkoutStore = workout.objectStore("workoutDB")
    //this adds record to your store with add method
    WorkoutStore.add(record)
};

function checkDatabase() {
    //open workout on the pending DB
    const workout = db.workout(["workoutDB"], "readwrite")
    //this accesses your pending object store
    const WorkoutStore = workout.objectStore("workoutDB")
    //this gets all records from store and sets them to a variable
    const getAll = BudgetStore.getAll()

    console.log("---See getAll data---")
    console.log(getAll)

    getAll.onsuccess = function () { 
      if(getAll.result.length > 0) {
        fetch('/api/workout/bulk', {
          method: 'POST',
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        })
            .then((response) => response.json())
            .then(() => {
              const workout = db.workout(["workoutDB", "readwrite"])

              const WorkoutStore = workout.objectStore("workoutDB")

              WorkoutStore.clear()
            })
      }
    }
}


//this listens for app coming back online
window.addEventListener('online', checkDatabase);





