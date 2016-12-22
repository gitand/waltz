/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016  Khartec Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import _ from 'lodash';


function service($http, baseUrl) {

    const BASE = `${baseUrl}/server-info`;

    const findByAssetCode = (assetCode) =>
        $http
            .then(result => result.data);

    const findByAppId = (appId) =>
        $http.get(`${BASE}/app-id/${appId}`)
            .then(result => result.data);


    const findStatsForSelector = (id, kind, scope = 'EXACT') => {
        const options = _.isObject(id)
            ? id
            : {scope, entityReference: {id, kind}};
        return $http
            .post(`${BASE}/apps/stats`, options)
            .then(result => result.data);
    };

    return {
        findByAssetCode,
        findByAppId,
        findStatsForSelector
    };
}

service.$inject = ['$http', 'BaseApiUrl'];


export default service;
