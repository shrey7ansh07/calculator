const button = Array.from(document.querySelectorAll('.buttons'));
let exp = document.querySelector('.display');
let text = "";
button.forEach(Element=>
    Element.addEventListener('mouseenter',grow)
);
button.forEach(Element=>
    Element.addEventListener('mouseleave',shrink)
);
button.forEach(Element=>
    Element.addEventListener('mousedown',transit));
button.forEach(Element=>
    Element.addEventListener('mouseup',function(e){

        perform(e.target.textContent);

    }));
    
function grow(e)
{
    e.target.classList.add('hovertransform');
}
function shrink(e)
{
    e.target.classList.remove('hovertransform');

}
function transit(e)
{
    e.target.classList.remove('hovertransform');
}
function checkforalready(Element)
{
    if(Element[Element.length-1]=='+'||Element[Element.length-1]=='-'||Element[Element.length-1]=='x'||Element[Element.length-1]=='/')
    return true;
    else return false;
}
function check(Element)
{
    if((Element[Element.length-2]=='+'||Element[Element.length-2]=='-'||Element[Element.length-2]=='x'||Element[Element.length-2]=='/')&&Element[Element.length-1]=='')
    return true;
    else return false;

}
function perform(allow)
{
    let operators = ['/', 'x', '+', '-'];

    switch(allow)
    {
        case '+':
            if(exp.textContent==''||checkforalready(exp.textContent))
            {
                break;
            }
            exp.textContent = exp.textContent + allow;
            text =  text + ","+allow+","; 
            break;
        case '-':
            if(checkforalready(exp.textContent)){break;}
            if(exp.textContent=='') text = text+allow;

            else text =  text + ","+allow+","; 
            exp.textContent = exp.textContent + allow;


            break;
        case 'x':
            if(exp.textContent==''||checkforalready(exp.textContent))
            {
                break;
            }
            exp.textContent = exp.textContent + allow;
            text =  text + ","+allow+","; 

            break;
        case '/':
            if(exp.textContent==''||checkforalready(exp.textContent))
            {
                break;
            }
            exp.textContent = exp.textContent + allow;
            text =  text + ","+allow+","; 

            break;
        case 'clear':
            exp.textContent  = exp.textContent.slice(0, -1);
            if(text[text.length-1]==',')
            {
                text = text.slice(0,-3);
            }
            else{
                text = text.slice(0,-1);
            }
            
            break;
        case "=":
            let calc = "";
            calc = calculate(text);
            exp.textContent = calc;
            if(checkforalready(calc)) text = calc.slice(0,-1)+","+calc[calc.length-1]+",";
            else text = calc;
            break;
        
        default:
            exp.textContent = exp.textContent+allow;
            text = text+allow;
            break;
        

    }
    
}
function calculate(item) {
    let arr = item.split(',');
    let operators = ['/', 'x', '+', '-'];
    let sign = "";

    // Remove the last element if it is an operator
    if (check(arr)) 
    {
        sign = arr[arr.length-2];
        arr.splice(arr.length - 2, 2);
    }


    operators.forEach((element) => {
      while (arr.includes(element)) {
        let index = arr.findIndex((el) => el === element);
  
        // Check if there are numbers on both sides of the operator
        if (index > 0 && index < arr.length - 1) {
          let num1 = parseFloat(arr[index - 1]);
          let num2 = parseFloat(arr[index + 1]);
          let ans;
  
          switch (element) {
            case '/':
              ans = num1 / num2;
              break;
            case 'x':
              ans = num1 * num2;
              break;
            case '+':
              ans = num1 + num2;
              break;
            case '-':
              ans = num1 - num2;
              break;
          }
  
          arr.splice(index - 1, 3, ans);
        } else {
          arr.splice(index, 1);
        }
      }
    });
  
    let value = arr[0].toString();
    sign = sign.toString()
    return (value+sign);
  }
  
  







