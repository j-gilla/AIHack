var acts = [
{name: 'Holly Mitchell', activity: 'Rambling Club', contactNumber:'01156 778 9890'},
{name: 'Steve Smith', activity: 'Manchester Bridge Society', contactNumber:'01143 998 1145'},
{name: 'Robert Slydell', activity: 'Greater Manchester Dog Walkers', contactNumber:'01143 6657 9980'},
{name: 'Harriet Ryder', activity: 'Greater Manchester Knitters', contactNumber:'01143 7781 5543'},
{name: 'Richard Armitage', activity: 'Lancashire Snooker Society', contactNumber:'01132 8890 0001'},
{name: 'Yasmin Stephens', activity: 'Manchester Chess Club', contactNumber:'1159 7813 8891'},
{name: 'Lynda Arteh', activity: 'Stretford Bowles Club', contactNumber:'13516 8878 9909'},
{name: 'Mauro Gesotos', activity: 'Prestwich Book Club', contactNumber:'01143 6897 6542'},
{name: 'Paul Richards', activity: 'Altricham Hiking Group', contactNumber:'13516 8878 9909'},
]


const matchWord = function(keyword){
  var output = acts.reduce(function(prev, next) {
    //console.log(value.activity);
    return prev + next.activity.includes(keyword) ? next.activity : ''
  }, '');
return output;
  };


var toUserCall  = 'Would you like the organiser of ' + matchWord('chess') + ' to contact you?'


console.log(toUserCall);
