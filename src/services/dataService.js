import { httpService } from "./httpService";

export const dataService = {
    loadData,
    updateData
}

async function loadData() {
    try {
        const data = await httpService.get('/trinius')
        console.log(data);
        return data[0]
    } catch (err) {
        console.log('err in dataervice in loadData:', err);
    }
}

async function updateData(updatedData) {
    try {
        httpService.put('/trinius/' + updatedData._id, updatedData)
    } catch (err) {
        console.log('err in dataService in updateData:', err);
    }
}

