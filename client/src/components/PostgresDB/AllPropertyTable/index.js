import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "@salesforce/design-system-react/components/data-table";
import DataTableColumn from "@salesforce/design-system-react/components/data-table/column";
import DataTableCell from "@salesforce/design-system-react/components/data-table/cell";
import Checkbox from "@salesforce/design-system-react/components/checkbox";
import {
  propertyFetchRequest,
  propertyFetchSuccess,
  propertyFetchFailure,
} from "../../../redux/property/propertyActions";
import IconSettings from "@salesforce/design-system-react/components/icon-settings";
import "./index.css";

/**
 * async function to do the api call and get the properties data
 */
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

const replacer = (key, value) => {
  if (value && typeof value === "object") {
    return value;
  } else if (value === null) {
    // if the value is null, we need to convert it to empty string, otherwise exception
    return "";
  } else {
    return "" + value;
  }
};

/**
 *
 * @param {*} properties
 *
 * implement a function to convert all items in array into string type
 * to avoid SLDS Datatable item[0].id is number, expected string error
 */
const parseProperties = (properties) => {
  return JSON.parse(JSON.stringify(properties, replacer));
};

/**
 *
 * @param {} param0
 *
 * this one and the following one are sepearte independent nested customized component
 * follow the official guide
 */
const ClickableDataTableCell = ({ children, ...props }) => (
  <DataTableCell title={children} {...props}>
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
  //so here boolen check won't work, need to check string value
  if (props.item.has_sold__c === "true") {
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

const AllPropertyTable = (props) => {
  const dispatch = useDispatch();

  //global state
  let isLoggedIn = useSelector((state) => state.auth.loggedIn);
  let properties = useSelector((state) => state.property.items);
  let error = useSelector((state) => state.property.error);

  //component state
  const [sortColumn, setSortColumn] = useState("name__c");
  const [sortColumnDirection, setSortColumnDirection] = useState({
    name__c: "asc",
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(propertyFetchRequest);

      fetchProperties()
        .then((properties) => {
          if (properties) {
            //dispatch an action which will update properties state in redux store
            dispatch(propertyFetchSuccess(properties));
            setItems(parseProperties(properties));
          } else {
            dispatch(propertyFetchFailure("Fetching properties error..."));
          }
        })
        .catch((err) => {
          dispatch(propertyFetchFailure(err));
        });
    }
  }, [isLoggedIn]);

  const handleSort = (sortColumn, ...rest) => {
    if (props.log) {
      props.log("sort")(sortColumn, ...rest);
    }

    const sortProperty = sortColumn.property;
    const { sortDirection } = sortColumn;
    const newState = {
      sortColumn: sortProperty,
      sortColumnDirection: {
        [sortProperty]: sortDirection,
      },
      items: [...items],
    };

    // needs to work in both directions
    newState.items = newState.items.sort((a, b) => {
      let val = 0;

      if (a[sortProperty] > b[sortProperty]) {
        val = 1;
      }
      if (a[sortProperty] < b[sortProperty]) {
        val = -1;
      }

      if (sortDirection === "desc") {
        val *= -1;
      }

      return val;
    });

    setSortColumn(newState.sortColumn);
    setSortColumnDirection(newState.sortColumnDirection);
    setItems(newState.items);
  };

  return (
    <div>
      {error ? (
        <div className="slds-box slds-theme_shade slds-theme_alert-texture slds-box_small slds-text-font_monospace cmp-body-title-wrapper">
          <div className="slds-box cmp-body-title-container">
            <div className="display-linebreak">{error}</div>
          </div>
        </div>
      ) : (
          <div className="slds-box slds-m-vertical_small cmp-body-title-container">
            <div className="slds-text-title_bold slds-text-title_caps slds-p-vertical_x-small">
              All Properties
            </div>
            <div className="height-200">
              <IconSettings iconPath="../../../assets/icons">
                <DataTable
                  items={items}
                  id="all-properties"
                  fixedLayout
                  fixedHeader
                  onSort={handleSort}
                >
                  <DataTableColumn
                    key="property-name"
                    label="Property Name"
                    property="name__c"
                    primaryColumn
                    sortable
                  />
                  <DataTableColumn
                    key="no-of-rooms"
                    label="No. of Rooms"
                    property="no_of_rooms__c"
                    sortable
                  />
                  <DataTableColumn
                    key="est-min-price"
                    label="Estimate Min Price"
                    property="est_min_price__c"
                    sortable
                  />
                  <DataTableColumn
                    key="est-max-price"
                    label="Estimate Max Price"
                    property="est_max_price__c"
                    sortable
                  />
                  <DataTableColumn
                    key="land-size"
                    label="Land Size"
                    property="land_size__c"
                    sortable
                  />
                  <DataTableColumn
                    key="has-sold"
                    label="Has Sold"
                    property="has_sold__c"
                    sortable
                  >
                    <CheckboxDataTableCell />
                  </DataTableColumn>
                  <DataTableColumn key="name" label="SF Name" property="name">
                    <ClickableDataTableCell />
                  </DataTableColumn>
                </DataTable>
              </IconSettings>
            </div>
          </div>
        )}
    </div>
  );
};

export default AllPropertyTable;
