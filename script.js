const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operations = ["/", "*", "-", "+"];
const IDs = {
  7: "seven", 
  8: "eight", 
  9: "nine", 
  4: "four", 
  5: "five", 
  6: "six", 
  1: "one", 
  2: "two", 
  3: "three", 
  0: "zero",
  "/": "divide", 
  "*": "multiply", 
  "-": "subtract", 
  "+": "add",
}

class App extends React.Component {
  state = {
    lastPressed: undefined,
    calculation: "0",
    operation: undefined
  }
  
  
  handleClick = (event) => {
    const { calculation, lastPressed } = this.state;
    const { innerText } = event.target;


    
    
    switch(innerText) {
        
      case "AC": {
        this.setState({
          calculation: "0"
        });
        break
      }
        
      case "=": {
        const evaluated = eval(calculation);
        this.setState({
          calculation: evaluated
        });
        break;
      }
        
      case ".": {
        const splitted = calculation.split(/[\+\-\*\/]/);
        const lastDigit = splitted.slice(-1)[0];
        
        if (!lastDigit.includes(".")) {
          this.setState({
            calculation: calculation + "."
          });
        }
        break;
      }
        
      default: {
        let result = undefined;
        if(operations.includes(innerText)) {
          if(operations.includes(lastPressed) && innerText !== "-") {
            const lastNumberId = calculation.split("").reverse()
              .findIndex(char => char !== " " && numbers.includes(+char));
            result = calculation.slice(0, calculation.length - lastNumberId) + ` ${innerText} `;
          } else {
            result = `${calculation} ${innerText} `;
          }
        } else {
            result = calculation === "0" ? innerText : (calculation + innerText);
          }
        this.setState({
            calculation: result
        });        
      }
    }
    
this.setState({
  lastPressed: innerText
});
    
    }
  
  render() {
    const { calculation, operation} = this.state;
    
    return( 
      <div className="calculator">
        
        <div id="display" className="display">
          {calculation}
        </div>
        
        <div className="numbers-container">
          
          <button
            id="clear"
            className="light-grey horizontal clear"
            onClick={this.handleClick}
          >
            AC
          </button> 
          
          {numbers.map(num => (
            <button
              id={IDs[num]}
              key={num}
              className={`dark-grey ${num === 0 && "horizontal"}`}
              onClick={this.handleClick}
            >
              {num}
            </button>   
          ))}
          
          <button
            id="decimal"
            className="blue"
            onClick={this.handleClick}
          >
            .
          </button> 

        </div>
        <div className="operations-container">
          {operations.map(op => (
            <button
              id={IDs[op]}
              key={op}
              className="blue"
              onClick={this.handleClick}
            >
              {op}
            </button>    
          ))}
          
          <button 
            className="blue" 
            onClick={this.handleClick} 
            id="equals"
           >
            =
          </button>
          
        </div>
        
       </div>
    );
  }
  
}

ReactDOM.render(<App/>, document.getElementById("root"));
