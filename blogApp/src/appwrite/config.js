import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuedImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        { title, content, featuedImage, status, userId }
      );
    } catch (error) {
      console.log("App Write :: create Post Error", error);
    }
  }

  async updatePost(slug, { title, content, featuedImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        { title, content, featuedImage, status }
      );
    } catch (error) {
      console.log("App Write :: Update Post Error", error);
    }
  }

  async deletePost(slug){
    try {
        await this.databases.deleteDocument(conf.appWriteDatabaseId,conf.appWriteCollectionId,slug);
        return true;
    } catch (error) {
        console.log("App Write :: Delete Post Error", error);
        return false;
    }
  }
  
  async getPost(slug){
    try {
       return await this.databases.getDocument(conf.appWriteDatabaseId,conf.appWriteCollectionId,slug);
    } catch (error) {
        console.log("App Write :: Get Post Error", error);
        return false;
    }
  }

  async getPosts(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(conf.appWriteDatabaseId,conf.appWriteCollectionId,queries)
    } catch (error) {
        console.log("App Write :: Get Posts Error", error);
        return false;
    }
  }

  //file upload method

  async uploadFile(file){
    try {
        return await this.bucket.createFile(conf.appWriteBucketId,ID.unique(),file)
    } catch (error) {
        console.log("App Write ::upload file Error", error);
        return false;
    }
  }

  async deleteFile(fileId){
    try {
         await this.bucket.deleteFile(conf.appWriteBucketId,fileId);
         return true;
    } catch (error) {
        console.log("App Write ::delete file Error", error);
        return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(conf.appWriteBucketId,fileId)
  }
  
}

const service = new Service();

export default service;
