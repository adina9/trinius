import { dataService } from '../../services/dataService.js'

export function loadData() {
    return async dispatch => {
        try {
            const data = await dataService.loadData()
            dispatch({ type: 'SET_DATA', data })
        } catch (err) {
            console.log('err in dataAction in loadData:', err);
        }
    }
}