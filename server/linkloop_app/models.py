from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, MaxValueValidator, MinValueValidator
from django.db import models


class Profile(models.Model):
    class Meta:
        db_table = "user_profile"

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profiles', unique=True)
    profile_picture = models.URLField(verbose_name="profile_pic_url", blank=True, null=True)
    headline = models.CharField(db_column="headline", blank=False, default="", null=False, max_length=32,
                                validators=[MinLengthValidator(3)])
    location = models.CharField(db_column="location", blank=False, null=False, max_length=128,
                                validators=[MinLengthValidator(10)])
    rating = models.PositiveSmallIntegerField(db_column="rating", blank=True, null=True,
                                              validators=[MinValueValidator(1), MaxValueValidator(5)])
    website = models.URLField(db_column="website_url", blank=True, null=True)
    date_of_birth = models.DateField(db_column="date_of_birth", blank=False, null=False)
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class Video(models.Model):
    class Meta:
        db_table = "video"

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="videos")
    video_url = models.URLField(verbose_name="video_url", blank=False, null=False)
    topic = models.CharField(db_column="topic", blank=False, null=False, max_length=128,
                             validators=[MinLengthValidator(1)])
    title = models.CharField(db_column="title", default='', blank=False, null=False, max_length=64,
                             validators=[MinLengthValidator(1)])
    description = models.TextField(db_column="description", blank=False, null=False, max_length=300,
                                   validators=[MinLengthValidator(1)])
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class VideoLike(models.Model):
    class Meta:
        db_table = "video_like"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class VideoComment(models.Model):
    class Meta:
        db_table = "video_comment"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    comment_text = models.TextField(db_column="comment_text", blank=False, null=False, max_length=1000,
                                    validators=[MinLengthValidator(1)])
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class VideoImpression(models.Model):
    class Meta:
        db_table = "video_impression"

    viewer = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    impression_duration = models.TimeField(db_column="impression_duration", blank=True, null=True)
    impression_time = models.DateTimeField(db_column="impression_time", auto_now_add=True)


class Skill(models.Model):
    class Meta:
        db_table = "skill"

    skill_name = models.CharField(db_column="skill_name", max_length=128, blank=False, null=False,
                                  validators=[MinLengthValidator(3)])
    skill_level = models.PositiveSmallIntegerField(db_column="rating", blank=True, null=True,
                                                   validators=[MinValueValidator(1), MaxValueValidator(10)])
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class UserSkill(models.Model):
    class Meta:
        db_table = "user_skill"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class Education(models.Model):
    class Meta:
        db_table = "education"

    education_name = models.CharField(db_column="education_name", blank=False, null=False, max_length=128,
                                      validators=[MinLengthValidator(5)])
    school_name = models.CharField(db_column="school_name", blank=False, null=False, max_length=128,
                                   validators=[MinLengthValidator(5)])
    start_date = models.DateField(db_column="start_date", blank=False, null=False)
    end_date = models.DateField(db_column="end_date", blank=True, null=True)
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class UserEducation(models.Model):
    class Meta:
        db_table = "user_education"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    education = models.ForeignKey(Education, on_delete=models.PROTECT)
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class Experience(models.Model):
    class Meta:
        db_table = "experience"

    experience_name = models.CharField(db_column="experience_name", blank=False, null=False, max_length=128)
    experience_description = models.TextField(db_column="description", blank=False, null=False, max_length=300,
                                              validators=[MinLengthValidator(1)])
    start_date = models.DateField(db_column="start_date", blank=False, null=False)
    end_date = models.DateField(db_column="end_date", blank=True, null=True)
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class UserExperience(models.Model):
    class Meta:
        db_table = "user_experience"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    experience = models.ForeignKey(Experience, on_delete=models.DO_NOTHING)
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)


class ProfileImpression(models.Model):
    class Meta:
        db_table = "profile_impression"

    viewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='viewer', blank=True, null=True)
    viewed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='viewed_profile')
    viewed_time = models.DateTimeField(db_column="viewed_time", auto_now_add=True)


class UserSearch(models.Model):
    class Meta:
        db_table = "user_search"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    search_query = models.CharField(db_column="search_query", blank=False, null=False, max_length=300,
                                    validators=[MinLengthValidator(1)])
    search_time = models.DateTimeField(db_column="search_time", auto_now_add=True)


class Message(models.Model):
    class Meta:
        db_table = "message"

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_message', default='')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_message', default='')
    title = models.CharField(db_column="title", blank=False, null=False, max_length=128,
                             validators=[MinLengthValidator(5)])
    description = models.TextField(db_column="description", blank=False, null=False, max_length=300,
                                   validators=[MinLengthValidator(1)])
    message_text = models.TextField(db_column="message_text", blank=False, null=False, max_length=1000,
                                    validators=[MinLengthValidator(10)], default='')
    location = models.CharField(db_column="location", blank=False, null=False, max_length=128,
                                validators=[MinLengthValidator(5)])
    created_time = models.DateTimeField(db_column="created_time", auto_now_add=True)
    updated_time = models.DateTimeField(db_column="updated_time", auto_now=True)
