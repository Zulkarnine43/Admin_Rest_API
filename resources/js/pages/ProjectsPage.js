import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from "axios";
import {Button, Card, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class ProjectsPage extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataID:"",
            deleteBtnText:"Delete",
            AdNewModal:false,
            projectName:'',
            projectDes:'',
            projectFeatures:'',
            projectLink:'',
            photoOne:'',
            photoTwo:'',
        }

        this.dataDelete=this.dataDelete.bind(this);
        this.imgCellFormat=this.imgCellFormat.bind(this);

        this.addNewModalOpen=this.addNewModalOpen.bind(this);
        this.addNewModalClose=this.addNewModalClose.bind(this);

        this.onNameChange=this.onNameChange.bind(this);
        this.onDesChange=this.onDesChange.bind(this);
        this.onFeaturesChange=this.onFeaturesChange.bind(this);
        this.onLinkChange=this.onLinkChange.bind(this);
        this.onPhotoOneChange=this.onPhotoOneChange.bind(this);
        this.onPhotoTwoChange=this.onPhotoTwoChange.bind(this);

        this.addFormSubmit=this.addFormSubmit.bind(this);



    }



    onNameChange(event){
            this.setState({projectName:event.target.value})
    }
    onDesChange(event){
        this.setState({projectDes:event.target.value})
    }

    onFeaturesChange(content, delta, source, editor){
       let htmlContent= editor.getHTML();
        this.setState({projectFeatures:htmlContent})
    }

    onLinkChange(event){
        this.setState({projectLink:event.target.value})
    }
    onPhotoOneChange(event){
        this.setState({photoOne:event.target.files[0]})
    }
    onPhotoTwoChange(event){
        this.setState({photoTwo:event.target.files[0]})
    }


    addFormSubmit(event){

        event.preventDefault();

        let projectName=this.state.projectName;
        let projectDes=this.state.projectDes;
        let projectFeatures=this.state.projectFeatures;
        let projectLink=this.state.projectLink;
        let photoOne=this.state.photoOne;
        let photoTwo=this.state.photoTwo;
        let myFormData=new FormData();
        myFormData.append('projectName',projectName);
        myFormData.append('projectDes',projectDes);
        myFormData.append('projectFeatures',projectFeatures);
        myFormData.append('projectLink',projectLink);
        myFormData.append('photoOne',photoOne);
        myFormData.append('photoTwo',photoTwo);

        let url="/AddProject";
        let config={
            headers:{ 'content-type':'multipart/form-data'}
        }




        Axios.post(url,myFormData,config).then((response)=> {
            if(response.data==1){
                toast.success('Create Success', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
                this.addNewModalClose();
                this.componentDidMount();
            }
            else {
                toast.error('Create Fail', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
            }
        }).catch((error)=> {
            toast.error('Create Fail', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
            });
        })



    }





    componentDidMount() {
        Axios.get('/ProjectList').then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,isLoading:false,isError:false})
            }
            else{
                this.setState({isLoading:false,isError:true})
            }
        }).catch((error)=>{
            this.setState({isLoading:false,isError:true})
        })
    }

    dataDelete(){

        let confirmResult=confirm("Do You Want To Delete ?")
        if(confirmResult===true){
            this.setState({deleteBtnText:"Deleting..."})
            Axios.post('/ProjectDelete',{id:this.state.rowDataID}).then((response)=>{
                if(response.data==1 && response.status==200){
                    toast.success('Delete Success', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                    this.setState({deleteBtnText:"Delete"})
                    this.componentDidMount();
                }
                else{
                    toast.error('Delete Fail', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                    this.setState({deleteBtnText:"Delete"})
                }


            }).catch((error)=>{
                toast.error('Delete Fail', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
                this.setState({deleteBtnText:"Delete"})
            })
        }

    }

    imgCellFormat(cell,row){
        return(
            <img className="table-cell-img" src={cell}/>
        )
    }

    addNewModalOpen(){
        this.setState({AdNewModal:true});
    }
    addNewModalClose(){
        this.setState({AdNewModal:false});
    }





    render() {
        if(this.state.isLoading==true){
            return (
                <Menu title="Projects">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }
        else if(this.state.isError==true){
            return (
                <Menu title="Projects">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }else{



            const data = this.state.dataList;
            const columns=[
                {dataField: 'img_one', text: 'Image',formatter:this.imgCellFormat},
                {dataField: 'id', text: 'ID'},

                {dataField: 'project_name', text: 'Project Name '},
                {dataField: 'short_description', text: 'Description'},
            ]
            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataID:row['id']})
                }
            }

            return (
                <Fragment>
                    <Menu title="Projects">
                        <Container fluid={true}>
                            <Row>
                                <Col md={12} sm={12} lg={12}>
                                    <Card>
                                        <Card.Body>
                                            <button onClick={this.dataDelete} className="normal-btn  my-2 btn">{this.state.deleteBtnText}</button>
                                            <button onClick={this.addNewModalOpen} className="normal-btn ml-3 my-2 btn">Add New</button>
                                            <BootstrapTable
                                                keyField='id'
                                                data={ data }
                                                columns={ columns }
                                                selectRow={selectRow}
                                                pagination={ paginationFactory() }>
                                            </BootstrapTable>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <ToastContainer
                                position="bottom-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable
                                pauseOnHover={false}
                            />

                        </Container>
                    </Menu>

                    <Modal  scrollable={true} size="lg" show={this.state.AdNewModal} onHide={this.addNewModalClose}>
                        <Modal.Header closeButton>
                            <h6>Add New Project</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group >
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control onChange={this.onNameChange} type="text" placeholder="Project Name" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control  onChange={this.onDesChange} type="text" placeholder="Short Description" />
                                </Form.Group>

                                <Form.Group className="mb-5" >
                                    <Form.Label>Project Features</Form.Label>
                                    <ReactQuill  onChange={this.onFeaturesChange} className="h-50" theme="snow" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Live Preview Link</Form.Label>
                                    <Form.Control onChange={this.onLinkChange} type="text" placeholder="Live Preview Link" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Project Card Image</Form.Label>
                                    <Form.Control onChange={this.onPhotoOneChange} type="file" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Project Details Image</Form.Label>
                                    <Form.Control onChange={this.onPhotoTwoChange} type="file"  />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.addNewModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Fragment>
            );
        }
    }
}
export default ProjectsPage;
