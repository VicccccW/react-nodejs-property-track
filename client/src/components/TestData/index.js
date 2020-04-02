import React from "react";
import { useSelector, useDispatch } from "react-redux"; //connect this component to the store that's provided by the provider component
import { getAll } from "../../redux";

const TestData = () => {
  //this hooks accepts a function as parameter, called selector function
  //the parameter function receives redux state as parameter
  const data = useSelector(state => state.test.data);

  //this hooks returns a reference to the dispatch function from the redux store
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(getAll());
  };

  return (
    <div>
      <p>test data p element placeholder</p>
      {data.map(property => (
        <div>{property.name}</div>
      ))}

      <button onClick={onClickHandler}>load</button>
    </div>
  );
};

export default TestData;

// //commented out as we are now using hooks instead of connect
// //but keep these code for future reference and compare
// //step 1, or can use selector
// //the state from the redux store is mapped to component props
// //whatever the props the component receiving
// //it now also receive an additional prop called test
// //and the data is from state and is state.test.data
// const mapStateToProps = state => ({
//   test: state.test.data
// });

// //step 2
// //map the dispatch of an action creator to a prop in the component
// //which means map a dispatch function to a new prop in the component
// const mapDispatchToProps = dispatch => {
//   return {
//     getAll: () => dispatch(getAll())
//   }
// }

// //step 3, connect above 2 function with react component

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(testData);
