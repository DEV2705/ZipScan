from django.core.management.base import BaseCommand
from plagiarism_check.ml_models import train_plagiarism_model

class Command(BaseCommand):
    help = 'Train the plagiarism detection model'

    def handle(self, *args, **options):
        self.stdout.write('Starting model training...')
        train_plagiarism_model()
        self.stdout.write(
            self.style.SUCCESS('Model training completed successfully!')
        )
