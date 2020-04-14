import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoAuth from "../NoAuth";
import DataTable from "@salesforce/design-system-react/components/data-table";
import DataTableColumn from "@salesforce/design-system-react/components/data-table/column";
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import { propertyFetchRequest, propertyFetchSuccess, propertyFetchFailure } from "../../redux/property/propertyActions";

const intro = `
This component will render one or more tables from Postgresql Database. 
In Heroku app, a Postgresql Database is attached as an addon and read data from Salesforce.
Heroku Connect has the ability to sync data bidirectionally with Salesforce. 
For now, just enable the default feature, which is pull data from Salesforce.
`;

async function fetchProperties() {
  const propertyRes = await fetch("/api/postgres/getAll");

  if (propertyRes.status === 200) {
    const properties = await propertyRes.json();
    return properties;
  } else if (propertyRes.status === 401) {
    return Promise.reject("Unauthorized");
  } else {
    return;
  }
}

const ClickableDataTableCell = ({ children, ...props }) => (
  <DataTableCell {...props}>
    {/* <a
      href="javascript:void(0);"
      onClick={(event) => {
        event.preventDefault();
        console.log(props);
      }}
    >
      {children}
    </a> */}

    <a
      href="javascript:void(0);"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {children}
    </a>
  </DataTableCell>
);

ClickableDataTableCell.displayName = DataTableCell.displayName;

const CheckboxDataTableCell = ({ children, ...props }) => {

  //we previously convert the json data into string
  //so here boolen check won't work, need to check string valye
  if (props.item.has_sold__c === 'true') {
    return (
      <DataTableCell {...props}>
        <Checkbox disabled checked />
      </DataTableCell>
    );
  } else {
    return (
      <DataTableCell {...props}>
        <Checkbox disabled />
      </DataTableCell>
    );
  }
};

CheckboxDataTableCell.displayName = DataTableCell.displayName;

const columns = [
  <DataTableColumn key="property-name" label="Property Name" property="name__c" />,

  <DataTableColumn key="no-of-rooms" label="No. of Rooms" property="no_of_rooms__c" />,

  <DataTableColumn key="est-min-price" label="Estimate Min Price" property="est_min_price__c" />,

  <DataTableColumn key="est-max-price" label="Estimate Max Price" property="est_max_price__c" />,

  <DataTableColumn key="land-size" label="Land Size" property="land_size__c" />,

  <DataTableColumn key="has-sold" label="Has Sold" property="has_sold__c">
    <CheckboxDataTableCell />
  </DataTableColumn>,

  <DataTableColumn key="name" label="SF Name" property="name" >
    <ClickableDataTableCell />
  </DataTableColumn>,
];

const PropertyTable = ({ properties, error }) => {
  if (error) {
    return (
      <div className="slds-box slds-theme_shade slds-theme_alert-texture slds-box_small slds-text-font_monospace cmp-body-title-wrapper">
        <div className="slds-box cmp-body-title-container">
          <div className="display-linebreak">{error}</div>
        </div>
      </div>
    );
  } else {
    return (
      <DataTable items={properties} id="all-properties">
        {columns}
      </DataTable>
    );
  }
};

const replacer = (key, value) => {
  if (value && typeof value === 'object') {
    return value;
  } else if (value === null) {
    return '';
  } else {
    return '' + value;
  }
}

/**
 * 
 * @param {*} properties 
 * 
 * implement a function to convert all items in array into string type
 * to avoid SLDS Datatable item[0].id is number, expected string error
 */
const parseProperties = properties => {
  return JSON.parse(JSON.stringify(properties, replacer));
}

/**
 * component main entry point
 */
const PostgresDB = () => {
  const dispatch = useDispatch();

  let isLoggedIn = useSelector((state) => state.auth.loggedIn);
  let properties = useSelector((state) => state.property.items);
  let error = useSelector((state) => state.property.error);

  let parsedProperties = parseProperties(properties);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(propertyFetchRequest);

      fetchProperties()
        .then((properties) => {
          if (properties) {
            dispatch(propertyFetchSuccess(properties));
          } else {
            dispatch(propertyFetchFailure("Fetching properties error..."));
          }
        })
        .catch((err) => {
          dispatch(propertyFetchFailure(err));
        });
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="slds-box slds-theme_shade slds-theme_alert-texture slds-box_small slds-text-font_monospace cmp-body-title-wrapper">
            <div className="slds-box cmp-body-title-container">
              <div className="display-linebreak">{intro}</div>
            </div>
          </div>

          <PropertyTable properties={parsedProperties} error={error} />
        </div>
      ) : (
          <NoAuth />
        )}
    </div>
  );
}

export default PostgresDB;
