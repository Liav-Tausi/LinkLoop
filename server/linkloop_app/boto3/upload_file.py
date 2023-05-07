import logging
from typing import Union
import boto3




def upload_file_to_s3(filename, bucket_name, obj_key) -> Union[str, bool]:
    try:
        s3_client = boto3.client('s3')
        s3_client.upload_fileobj(filename, bucket_name, obj_key, ExtraArgs={'ContentType': 'video/mp4'})
        return f"https://{bucket_name}.s3.amazonaws.com/{obj_key}"
    except Exception as e:
        logging.error(e)
        return False


