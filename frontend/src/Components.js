import styled from 'styled-components';

// Container component for the login modal
// ensures modal centered on screen and responsive 
//with maximum width of 678px and a minimum height of 400px
export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


// Sign-up container component
//takes up full height of  modal 
// and transitions with 0.6s ease-in-out effect. 
//When signinIn prop is not true, slides into view translating  
//left by 100% and becomes visible with an opacity of 1.
export const SignUpContainer = styled.div`
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;
 opacity: 0;
 z-index: 1;
 ${props => props.signinIn !== true ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 ` 
 : null}
`;

// Sign-in container component
//takes up full height of  modal 
// and transitions with 0.6s ease-in-out effect. 
//When signinIn prop is not true, slides into view translating  
//left by 100% and becomes visible with an opacity of 1.
export const SignInContainer = styled.div`
position: absolute;
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
left: 0;
width: 50%;
z-index: 2;
${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

// Form component for the login modal
export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
`;

// Title component for the login modal
export const Title = styled.h1`
font-weight: bold;
margin: 0;
`;

// Input component for the login form
export const Input = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 100%;
`;

// Button component for the login form
export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #FE9E0D;
   background-color: #FE9E0D;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;

// Ghost button component for the login form
//scale transform effect when active and removes the default outline on focus.
export const GhostButton = styled(Button)`
background-color: transparent;
border-color: #ffffff;
`;

// Anchor component for the login form
export const Anchor = styled.a`
color: #333;
font-size: 14px;
text-decoration: none;
margin: 15px 0;
`;

// Overlay container component for the login modal
//It is positioned absolutely, takes up 50% of the width, and the full height of the modal. 
//It has hidden overflow and transitions with a 0.6s ease-in-out effect. 
//When signinIn prop is not true, it slides into view by translating to the left by 100%.
export const OverlayContainer = styled.div`
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;
${props =>
 props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

// Overlay component for the login modal
// It sets the background as a gradient, with a transition effect. 
//When signinIn prop is not true, it slides into view by translating to the left by 50%.
export const Overlay = styled.div`
background: #ff416c;
background: -webkit-linear-gradient(to right, #B3CAA2, #7DA67D);
background: linear-gradient(to right, #B3CAA2, #7DA67D);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

// Overlay panel component for the login modal
//positioned absolutely and takes up 50% of the width of the overlay.
// It uses flexbox to center its content and transitions with a 0.6s ease-in-out effect.
export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

// Left overlay panel component for the login modal
//styled component that extends the OverlayPanel component
//Initially translates to the left by 20% 
//when signinIn prop is not true, slides into view translating left by 0%.
export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

// Right overlay panel component for the login modal
//styled component that extends the OverlayPanel component
//positioned on the right side  
//when signinIn prop is not true, slides into view translating left by 20%.
export const RightOverlayPanel = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

// Paragraph component for the login modal
export const Paragraph = styled.p`
font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
`;