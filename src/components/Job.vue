<template>
    <div class="job">
        <table class="show-table">
            <colgroup>
                <col style="background-color: #C0C0C0">
                <col span="10" style="background-color: #C0C0ff">
            </colgroup>
            <thead>
            <tr>
                <th>Id</th>
                <th>Company</th>
                <th>Boss</th>
                <th>City</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody :key=job.Id v-for="(job, index) in jobs">
            <tr>
                <td>{{job.Id}}</td>
                <td>{{job.Company}}</td>
                <td>{{job.Boss}}</td>
                <td>{{job.City}}</td>
                <td>{{job.Address}}</td>
                <td is="job-actions" :id="job.Id" :index="index" v-on:deleteRecord="deleteById"
                    v-on:UpdateRecord="prepareUpdate"></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td>总共</td>
                <td colspan="10">{{jobTotal}}条</td>
            </tr>
            </tfoot>
        </table>
        <div class="edit-job">
            <button id="refresh" v-on:click="getAll()">刷新</button>
            <form id="job-form">
                <div class="form-line">
                    <label for="job-company">Company:</label>
                    <input v-model.trim="jobCompany" id="job-company" placeholder="ragingHot">
                </div>
                <div class="form-line">
                    <label for="job-boss">Boss:</label>
                    <input v-model.trim="jobBoss" id="job-boss" placeholder="qinghui.li">
                </div>
                <div class="form-line">
                    <label for="job-city">City:</label>
                    <input v-model.trim="jobCity" id="job-city" placeholder="Beijing">
                </div>
                <div class="form-line">
                    <label for="job-address">Address:</label>
                    <input v-model.trim="jobAddress" id="job-address" placeholder="ao-ti-zhong-xin">
                </div>
                <div v-if="!doUpdate" class="form-bottom">
                    <button v-on:click="add()">Add A Job</button>
                    <button type="reset">Clear</button>
                </div>
                <div v-if="doUpdate" class="form-bottom">
                    <button v-on:click="update()">Update</button>
                    <button type="reset">Clear</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import JobActions from '@/components/JobActions.vue'

    Vue.use(VueResource)
    //    Vue.http.options.emulateJSON = true;

    export default {
        data() {
            return {
                jobs: [],
                baseUrl: '/api/v1/job',
                jobCompany: String(),
                jobBoss: String(),
                jobCity: String(),
                jobAddress: String(),
                doUpdate: false,
                updateId: Number(-1),
                updateIndex: Number(-1)
            }
        },
        created: function () {
            this.getAll()
        },
        methods: {
            getAll: function () {
                this.$http.get(this.baseUrl).then(response => {
                    if (response.status === 200) {
                        this.jobs.splice(0, this.jobs.length)
                        for (let job of response.body) {
                            this.jobs.push(job)
                        }
                    } else if (response.status === 204) {
                        console.log('getAll jobs success, but no content')
                    }
                }, response => {
                    return console.error('get jobs err, status code: ', response.status)
                })
            },
            getById: function (id) {
                this.$http.get(this.baseUrl + '/' + id).then(response => {
                    if (response.status === 200) {
                        let data = response.body
                        if (data.msg) {
                            console.log('get job msg: ', data.msg)
                        } else {
                            this.jobs.push(data)
                        }
                    } else if (response.status === 204) {
                        console.log('get jobs by id success, but no content')
                    }
                }, response => {
                    return console.error('get job err, status code: ', response.status)
                })
            },
            add: function () {
                if (!this.jobIsValid()) {
                    let msg = '请先填入工作具体信息'
                    alert(msg)
                    return console.log(msg)
                }
                let job = [
                    {
                        'Company': this.jobCompany,
                        'Boss': this.jobBoss,
                        'City': this.jobCity,
                        'Address': this.jobAddress
                    }
                ];
                this.$http.post(this.baseUrl, job).then(response => {
                    console.log(job)
                    if (response.status === 200) {
                        let data = response.body
                        if (data.msg) {
                            console.log('add jobs msg: ', data.msg)
                        } else {
                            console.log('add success: ', data)
                            this.getAll()
                        }
                    }
                }, response => {
                    return console.error('add job err, status code: ', response.status)
                })
            },
            resetUpdate: function () {
                this.doUpdate = false
                this.updateId = Number(-1)
                this.updateIndex = Number(-1)
            },
            prepareUpdate: function (id, index) {
                this.doUpdate = true
                this.updateId = id
                this.updateIndex = index
                console.log('prepare update id: ', id, ' index: ', index)
                console.log(this.jobs[index])
                this.jobCompany = this.jobs[index].Company
                this.jobBoss = this.jobs[index].Boss
                this.jobCity = this.jobs[index].City
                this.jobAddress = this.jobs[index].Address
            },
            update: function (callback) {
                if (!this.jobIsValid()) {
                    let msg = '请先填入修改信息';
                    alert(msg);
                    return console.log(msg);
                }
                let job = {
                    'Company': this.jobCompany,
                    'Boss': this.jobBoss,
                    'City': this.jobCity,
                    'Address': this.jobAddress
                };
                this.$http.put(this.baseUrl + '/' + this.updateId, job).then(response => {
                    if (response.status === 200) {
                        let data = response.body
                        if (data.msg) {
                            console.log('put jobs msg: ', data.msg)
                        } else {
                            console.log('put success: ', data)
                            this.jobs.splice(this.updateIndex, 1, data)
                            this.resetUpdate()
                            if (callback) {
                                callback()
                            }
                        }
                    }
                }, response => {
                    return console.error('put job err, status code: ', response.status)
                })
            },
            deleteById: function (id, index, callback) {
                this.$http.delete(this.baseUrl + '/' + id).then(response => {
                    if (response.status === 200) {
                        let data = response.body
                        if (data.msg) {
                            console.log('delete jobs msg: ', data.msg)
                        } else {
                            console.log('delete success: ', data)
                            this.jobs.splice(index, 1)
                            if (callback) {
                                callback()
                            }
                        }
                    }
                }, response => {
                    return console.error('delete job err, status code: ', response.status)
                })
            },
            jobIsValid: function () {
                return this.jobCompany.length > 0 && this.jobBoss.length > 0 && this.jobCity.length > 0 && this.jobAddress.length > 0
            },
            bindJob: function () {
                return {
                    Company: this.jobCompany,
                    Boss: this.jobBoss,
                    City: this.jobCity,
                    Address: this.jobAddress
                }
            }
        },
        computed: {
            jobTotal: function () {
                return this.jobs.length
            }
        },
        components: {
            JobActions
        }
    }
</script>

<style scoped>
    .show-table {
        float: left;
        margin: 10px;
    }

    table {
        background: #ffffaa;
    }

    .edit-job {
        color: black;
        float: left;
        margin: 10px;
    }

    #job-form {
        margin: 40px 0px 0px 20px;
    }

    #refresh {
        width: 100px;
        float: left;
        margin-left: 20px;
    }

    .form-line label {
        width: 100px;
        float: left;
        text-align: left;
        margin: 5px;
    }

    .form-line input {
        width: 200px;
        margin: 5px;
        padding: 1px 1px;
        border: 1px solid #cccfff;
    }

    .form-bottom button {
        width: 100px;
        margin-left: 10px;
        margin-right: 10px;
    }

</style>
