import { createSelector } from 'reselect'

const getIds = (state) => state.ids
const getData = (state) => state.data

export const sortAlphabetically = createSelector(
  [ getIds, getData ],
  (ids, data) => {
    var outIds = ids.slice();
    outIds.sort(function(a, b) {
      return data[a].name.localeCompare(data[b].name);
    })
    return outIds;
  }
)


const getCIds = (state) => state.consumers.ids
const getConsumers = (state) => state.consumers.data
const getC2V = (state) => state.vehicles.consumersToVehiclesMap
export const getUnassignedConsumersSorted = createSelector(
  [getCIds, getConsumers, getC2V],
  (c_ids, consumers, consumersToVehiclesMap) => {
    var unassignedConsumers = [];
    c_ids.forEach(function(c_id){
      if(!consumersToVehiclesMap[c_id]){
        unassignedConsumers.push(consumers[c_id])
      }
    })
    unassignedConsumers.sort(function(a, b){
      return a.name.localeCompare(b.name);
    })
    return unassignedConsumers;
  }
)


const getUID = (state) => state.auth._id
const getUserIds = (state) => state.users.ids
const getUsers = (state) => state.users.data
export const removeUIDFromLIstAndSort = createSelector(
  [getUID, getUserIds, getUsers],
  (UID, ids, users) => {
    var userIds = ids.slice();
    var index = ids.indexOf(UID);
    if(index !== -1){
      userIds.splice(index,1);
    }
    userIds.sort((idA,idB)=>{
      return users[idA].email.localeCompare(users[idB].email)
    })
    return userIds
  }
)

/*
colorMarkers(state.mapPage.consumerMarkers,
state.vehicles.consumersToVehiclesMap,
state.mapPage.activeVehicleId,
state.mapPage.highlightedMarker,
state.mapPage.markerLoading),
*/

const mapConst = require('../constants/map');
const getMarkers = (state) => state.mapPage.consumerMarkers
const getC2VMap = (state) => state.vehicles.consumersToVehiclesMap
const getActiveVId = (state) => state.mapPage.activeVehicleId
const getHighligthedM = (state) => state.mapPage.highlightedMarker
const getMarkerLoadingState= (state) => state.mapPage.markerLoading
export const colorMarkers = createSelector(
  [getMarkers, getC2VMap, getActiveVId, getHighligthedM, getMarkerLoadingState],
  (consumerMarkers,
   consumersToVehiclesMap,
   activeVehicleId,
   highlightedConsumerId,
   markerLoading) => {
  return consumerMarkers.map(function(marker){
      var c_id = marker.consumerId;
      var icon = Object.assign({}, marker.icon);
      if(markerLoading == c_id){
        icon.fillColor =  mapConst.LOADING_CONSUMER_COLOR;
      }
      else if (consumersToVehiclesMap[c_id]) {
        // consumer is on board
        if (highlightedConsumerId == c_id) {
          icon.fillColor =  mapConst.HIGHLIGHTED_CONSUMER_COLOR;
        }else if(activeVehicleId !== consumersToVehiclesMap[c_id]){
          icon.fillColor =  mapConst.ASSIGNED_CONSUMER_COLOR;// not on the active bus
        }else{
          icon.fillColor =  mapConst.SELECTED_ASSIGNED_CONSUMER_COLOR;// on the active bus
        }
      }
      else{
        //consumer not assigned to vehicle
        if (highlightedConsumerId == c_id) {
          icon.fillColor = mapConst.HIGHLIGHTED_UNASSIGNED_COLOR;
        }else{
          icon.fillColor = mapConst.UNASSIGNED_CONSUMER_COLOR;
        }
      }
      return  Object.assign({}, marker, {
        icon:icon
      })
    });
  }
)
