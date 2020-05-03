import React from 'react';

/**
 *
 * @param {*} param0
 *
 * if the data contains a buildwith list
 * the buildwith list should follow data structure pattern: buildwithList:[{name: "xxx", detail: ["xxx","xxx"]}]
 */
function BuildwithList({ buildwithList }) {
  if (!buildwithList) {
    return null;
  }

  return (
    <div className="slds-grid slds-gutters slds-wrap">
      {buildwithList.map((item, i) => (
        <BuildwithItem key={i} {...item} />
      ))}
    </div>
  );
}

/**
 *
 * @param {*} param0
 *
 * if the data contains a buildwith list
 * this is the cmp that loop each item in the list
 */
function BuildwithItem({ name, detail }) {
  return (
    <div className="slds-col slds-size_1-of-4">
      <div className="slds-box slds-m-around_small">
        <div className="slds-text-title_bold slds-p-vertical_x-small">
          {name}
        </div>
        <ul>
          {detail.map((detailItem, i) => (
            <li key={i}>{detailItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 *
 * @param {*} param0
 *
 * if the data contains a urls list
 * the url list should follow data structure pattern: urls:[{urlName: "xxx", urlLink: "xxx"}]
 */
function Urls({ urls }) {
  if (!urls) {
    return null;
  }

  return (
    <ul>
      {urls.map((item, i) => (
        <div key={i}>
          {item.urlName}
          <a href={item.urlLink} target="_blank" rel="noopener noreferrer">
            {' '}
            {item.urlLink}
          </a>
        </div>
      ))}
    </ul>
  );
}

/**
 *
 * @param {*} param0
 *
 * this is the component main UI
 */
function SLDSGreyBox({ title, detail, urls, buildwithList }) {
  return (
    <div className="slds-box slds-m-vertical_small cmp-body-title-container">
      {title ? (
        <div className="slds-text-title_bold slds-text-title_caps slds-p-vertical_x-small">
          <div>{title}</div>
        </div>
      ) : (
        <></>
      )}
      {detail ? <div className="display-linebreak">{detail}</div> : <></>}
      <BuildwithList buildwithList={buildwithList} />
      <Urls urls={urls} />
    </div>
  );
}

export default SLDSGreyBox;
