import logging
import boto3


def delete_file_from_s3(bucket_name, obj_key) -> True or False:
    try:
        s3_client = boto3.client('s3')
        print(s3_client.delete_object(Bucket=bucket_name, Key=obj_key))
        return True
    except Exception as e:
        logging.error(e)
        return False


