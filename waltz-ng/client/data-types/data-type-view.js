/*
 *  Waltz
 * Copyright (c) David Watkins. All rights reserved.
 * The use and distribution terms for this software are covered by the
 * Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
 * which can be found in the file epl-v10.html at the root of this distribution.
 * By using this software in any fashion, you are agreeing to be bound by
 * the terms of this license.
 * You must not remove this notice, or any other, from this software.
 *
 */

import {initialiseData} from "../common";

const template = require('./data-type-view.html');


const initialState = {
    dataFlow: null,
    entityRef: null,
    flowOriginators: [],
    flowDistributors: []
};


function controller($scope,
                    dataType,
                    viewDataService,
                    dataFlowService,
                    dataTypeUsageStore,
                    historyStore,
                    tourService) {

    const vm = initialiseData(this, initialState);

    const entityReference = {
        kind: 'DATA_TYPE',
        id: dataType.id
    };


    const selector = {
        entityReference,
        scope: 'CHILDREN',
        desiredKind: 'DATA_TYPE'
    };

    vm.entityRef = entityReference;
    vm.dataType = dataType;

    vm.loadFlowDetail = () => viewDataService.loadFlowDetail();
    vm.onAssetBucketSelect = (bucket) => {
        $scope.$applyAsync(() => viewDataService.selectAssetBucket(bucket));
    };
    vm.getObjectLength = obj => {
        if(_.isObject(obj)) return _.values(obj).length;
        throw "Not an object: " + obj;
    }

    const refresh = () => {
        if (!vm.rawViewData) return;
        const dataType = vm.rawViewData.dataType;
        historyStore.put(dataType.name, 'DATA_TYPE', 'main.data-type.view', { id: dataType.id });
        vm.viewData = vm.rawViewData;
    };

    viewDataService
        .loadAll(dataType.id)
        .then(data => vm.rawViewData = data)
        .then(d => refresh())
        .then(() => tourService.initialiseForKey('main.data-type.view', true))
        .then(tour => vm.tour = tour);


    dataFlowService
        .initialise(selector)
        .then(flowData => vm.flowData = flowData)
        .then(() => dataFlowService.loadDetail())
        .then(flowData => vm.flowData = flowData);


    dataTypeUsageStore
        .findForUsageKindByDataTypeIdSelector('ORIGINATOR', selector)
        .then(originators => vm.flowOriginators = originators);


    dataTypeUsageStore
        .findForUsageKindByDataTypeIdSelector('DISTRIBUTOR', selector)
        .then(distributors => {
            vm.flowDistributors = distributors
        });
}


controller.$inject = [
    '$scope',
    'dataType',
    'DataTypeViewDataService',
    'DataFlowViewService',
    'DataTypeUsageStore',
    'HistoryStore',
    'TourService'
];


export default {
    template,
    controller,
    controllerAs: 'ctrl'
};